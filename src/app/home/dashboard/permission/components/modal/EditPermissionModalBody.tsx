'use client';

import BaseModalInput from '@/app/ui/BaseModalInput/BaseModalInput';
import { Permission } from '@/app/store/User.types';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FooterButtonsBlock } from '@/app/ui/Modal/components/FooterButtonsBlock';
import {
  EditPermissionModalSchema,
  PermissionModalFormData,
} from '@/app/home/dashboard/permission/components/schema/EditPermissionModal.schema';
import {
  createPermission,
  updatePermission,
} from '@/app/home/dashboard/permission/fetchers/permissionFetchers';

interface EditPermissionModalBodyProps {
  permissionItem?: Permission;
  mutatePermissions: () => void;
  close?: () => void;
}

export const EditPermissionModalBody = ({
  permissionItem,
  close,
  mutatePermissions,
}: EditPermissionModalBodyProps) => {
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

  const onSubmit = async (permissionData: PermissionModalFormData) => {
    const permissionRequestBody = {
      name: permissionData.name,
      description: permissionData.description,
      createdAt: permissionItem?.createdAt ?? new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    };
    if (permissionItem?.id) {
      await updatePermission(permissionRequestBody, permissionItem.id);
    } else {
      await createPermission(permissionRequestBody);
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
