'use client';
import Select, { NoOptionsMessage } from '@/app/ui/Select/Select';

import BaseModalInput from '@/app/ui/BaseModalInput/BaseModalInput';
import { intersectionBy } from 'lodash';
import useSWR from 'swr';
import { Controller, useForm } from 'react-hook-form';
import {
  EditRoleModalSchema,
  EditRoleModalSchemaType,
} from '@/app/home/dashboard/roles/components/schema/EditRoleModal.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FooterButtonsBlock } from '@/app/ui/Modal/components/FooterButtonsBlock';
import Checkbox from '@/app/ui/Checkbox/Checkbox';
import { getAllPermissions } from '@/app/home/dashboard/permission/fetchers/permissionFetchers';
import {
  createRole,
  updateRole,
} from '@/app/home/dashboard/roles/fetchers/roleFetchers';
import { RoleModelResponse } from '@/server/src/roles/model/role.model';

interface EditRoleModalBodyProps {
  roleItem?: RoleModelResponse;
  mutateRolePermissions: () => void;
  close?: () => void;
}

export const EditRoleModalBody = ({
  roleItem,
  close,
  mutateRolePermissions,
}: EditRoleModalBodyProps) => {
  const { data: permissions, isLoading } = useSWR(
    'editRoleModal_getAllPermission',
    async () => {
      const { data: allPermissions } = await getAllPermissions();
      return allPermissions;
    },
  );

  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm<EditRoleModalSchemaType>({
    resolver: zodResolver(EditRoleModalSchema),
    defaultValues: {
      name: roleItem?.name ?? '',
      description: roleItem?.description ?? '',
      isDefaultUser: roleItem?.isDefaultUser ?? false,
      permissions: intersectionBy(roleItem?.permission, permissions, 'id'),
    },
  });

  const onSubmit = async (rolesData: any) => {
    const roleRequestBody = {
      name: rolesData.name,
      description: rolesData.description,
      createdAt: roleItem?.createdAt ?? new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      isDefaultUser: rolesData.isDefaultUser,
      permission: rolesData.permissions,
    };
    if (roleItem?.id) {
      await updateRole(roleItem.id, roleRequestBody);
    } else {
      await createRole(roleRequestBody);
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
              options={permissions ?? []}
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
      <Controller
        control={control}
        name="isDefaultUser"
        render={({ field }) => {
          return (
            <Checkbox
              {...field}
              value={''}
              checked={field.value}
              onChange={(value: boolean) => field.onChange(value)}
              label={'Выбрать эту роль, как дефолтную роль, для пользователя'}
            />
          );
        }}
      />

      <FooterButtonsBlock
        declineTitle={'Отмена'}
        acceptType={'submit'}
        onDeclineHandler={() => close?.()}
        acceptTitle={roleItem ? 'Редактировать' : 'Создать'}
        acceptDisabled={!isValid || isSubmitting}
      />
    </form>
  );
};
