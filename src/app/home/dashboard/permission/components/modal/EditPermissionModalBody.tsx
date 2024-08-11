'use client';

import BaseModalInput from '@/app/ui/BaseModalInput/BaseModalInput';
import { Permission } from '@/app/store/User.types';
import useSWR from 'swr';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FooterButtonsBlock } from '@/app/ui/Modal/components/FooterButtonsBlock';
import { EditPermissionModalSchema } from '@/app/home/dashboard/permission/components/schema/EditPermissionModal.schema';

interface EditRoleModalBodyProps {
  permissionItem?: Permission;
  mutatePermissions: () => void;
  close?: () => void;
}

const fetchAllPermissions = async () => {
  return await fetch(
    `${process.env.FRONTEND_BASE_URL}/home/dashboard/permission/api`,
    { method: 'GET' },
  );
};
const updatePermissionModal = async (
  roleId: number,
  body: {
    name: string;
    description: string;
    updatedAt: Date;
    createdAt: Date;
  },
) => {
  const url = new URL(
    `${process.env.FRONTEND_BASE_URL}/home/dashboard/permission/api`,
  );

  url.searchParams.append('permissionId', String(roleId));

  return await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8', // Indicates the content
    },
    body: JSON.stringify(body),
  });
};
const createPermissionModal = async (body: {
  name: string;
  description: string;
  updatedAt: Date;
  createdAt: Date;
}) => {
  return await fetch(
    `${process.env.FRONTEND_BASE_URL}/home/dashboard/permission/api`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8', // Indicates the content
      },
      body: JSON.stringify(body),
    },
  );
};

export const EditPermissionModalBody = ({
  permissionItem,
  close,
  mutatePermissions,
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
    formState: { isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(EditPermissionModalSchema),
    defaultValues: {
      name: permissionItem?.name ?? '',
      description: permissionItem?.description ?? '',
    },
  });

  const onSubmit = async (rolesData: any) => {
    const permissionRequestBody = {
      name: rolesData.name,
      description: rolesData.description,
      createdAt: permissionItem?.createdAt ?? new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      permissions: rolesData.permissions,
    };
    if (permissionItem?.id) {
      await updatePermissionModal(permissionItem.id, permissionRequestBody);
    } else {
      await createPermissionModal(permissionRequestBody);
    }
    mutatePermissions();
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

      <FooterButtonsBlock
        declineTitle={'Отмена'}
        acceptType={'submit'}
        onDeclineHandler={() => close?.()}
        acceptTitle={permissionItem ? 'Редактировать' : 'Создать'}
        acceptDisabled={isSubmitting || !isValid}
      />
    </form>
  );
};
