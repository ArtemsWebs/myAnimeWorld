'use client';
import Select, { NoOptionsMessage } from '@/app/ui/Select/Select';

import BaseModalInput from '@/app/ui/BaseModalInput/BaseModalInput';
import { Permission, Role } from '@/app/store/User.types';
import { intersectionBy } from 'lodash';
import useSWR from 'swr';
import { Controller, useForm } from 'react-hook-form';
import { EditRoleModalSchema } from '@/app/home/dashboard/roles/components/schema/EditRoleModal.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FooterButtonsBlock } from '@/app/ui/Modal/components/FooterButtonsBlock';

interface EditRoleModalBodyProps {
  roleItem?: Role;
  mutateRolePermissions: () => void;
  allPermissions: any[];
  close?: () => void;
}

const fetchAllPermissions = async () => {
  return await fetch(
    `${process.env.FRONTEND_BASE_URL}/home/dashboard/permission/api`,
    { method: 'GET' },
  );
};
const updateRoleModal = async (
  roleId: number,
  body: {
    name: string;
    description: string;
    updatedAt: Date;
    createdAt: Date;
    permissions: Permission[];
  },
) => {
  const url = new URL(
    `${process.env.FRONTEND_BASE_URL}/home/dashboard/roles/api`,
  );

  url.searchParams.append('roleId', String(roleId));

  return await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8', // Indicates the content
    },
    body: JSON.stringify(body),
  });
};
const createRoleModal = async (body: {
  name: string;
  description: string;
  updatedAt: Date;
  createdAt: Date;
  permissions: Permission[];
}) => {
  return await fetch(
    `${process.env.FRONTEND_BASE_URL}/home/dashboard/roles/api`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8', // Indicates the content
      },
      body: JSON.stringify(body),
    },
  );
};

export const EditRoleModalBody = ({
  roleItem,
  close,
  mutateRolePermissions,
}: EditRoleModalBodyProps) => {
  const { data: permissions, isLoading } = useSWR(
    'editRoleModal_getAllPermission',
    async () => await fetchAllPermissions().then((res) => res.json()),
    {
      fallbackData: () => ({
        allPermissions: [],
      }),
    },
  );

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(EditRoleModalSchema),
    defaultValues: {
      name: roleItem?.name ?? '',
      description: roleItem?.description ?? '',
      permissions: intersectionBy(
        roleItem?.permission,
        permissions.allPermissions,
        'id',
      ),
    },
  });

  const onSubmit = async (rolesData: any) => {
    const roleRequestBody = {
      name: rolesData.name,
      description: rolesData.description,
      createdAt: roleItem?.createdAt ?? new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      permissions: rolesData.permissions,
    };
    if (roleItem?.id) {
      await updateRoleModal(roleItem.id, roleRequestBody);
    } else {
      await createRoleModal(roleRequestBody);
    }
    mutateRolePermissions();
    close?.();
  };

  return (
    <form
      className={'flex flex-col gap-4 relative h-[90%]'}
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(onSubmit)();
      }}
    >
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState, formState }) => {
          return (
            <BaseModalInput
              {...field}
              errorText={fieldState.error?.message}
              label="Имя"
              onChange={(e) => {
                field.onChange(e.currentTarget.value);
              }}
            />
          );
        }}
      />
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState, formState }) => {
          return (
            <BaseModalInput
              {...field}
              errorText={fieldState.error?.message}
              label="Описание"
              onChange={(e) => {
                field.onChange(e.currentTarget.value);
              }}
            />
          );
        }}
      />

      <Controller
        name="permissions"
        control={control}
        render={({ field, fieldState, formState }) => {
          return (
            <Select
              {...field}
              label="Полномочия"
              closeMenuOnSelect={false}
              options={permissions.allPermissions}
              isMulti={true}
              isClearable={false}
              isLoading={isLoading}
              components={{ NoOptionsMessage }}
              getOptionLabel={(val) => val.description}
              getOptionValue={(val) => val.name}
              onChange={(newValue, actionMeta) => {
                field.onChange(newValue);
              }}
            />
          );
        }}
      />

      <FooterButtonsBlock
        declineTitle={'Отмена'}
        acceptType={'submit'}
        onDeclineHandler={() => close?.()}
        acceptTitle={roleItem ? 'Редактировать' : 'Создать'}
        acceptDisabled={isSubmitting}
      />
    </form>
  );
};
