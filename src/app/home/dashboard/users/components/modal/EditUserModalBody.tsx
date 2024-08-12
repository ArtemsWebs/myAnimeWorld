import { User } from 'next-auth';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EditUserModalSchema,
  EditUserModalType,
} from '@/app/home/dashboard/users/components/schema/EditUserModal.schema';
import BaseModalInput from '@/app/ui/BaseModalInput/BaseModalInput';
import React, { useCallback, useEffect, useState } from 'react';
import { FooterButtonsBlock } from '@/app/ui/Modal/components/FooterButtonsBlock';
import FileUploader from '@/app/ui/FileUploader';
import { Select } from '@/app/ui';
import useSWR from 'swr';
import { getAllRolesWithPermission } from '@/app/home/dashboard/fetchers';

type UserWithoutId = Omit<User, 'id'>;

interface EditUserModalBodyProps {
  close?: () => void;
  mutateAllUsersWithRoles: () => void;
  userItem?: UserWithoutId;
}

const fectherEditUser = async (body: UserWithoutId) => {
  const formData = new FormData();

  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  return await fetch(
    `${process.env.FRONTEND_BASE_URL}/home/dashboard/users/api`,
    {
      method: 'POST',
      body: formData,
    },
  );
};

export const EditUserModalBody = ({
  userItem,
  mutateAllUsersWithRoles,
  close,
}: EditUserModalBodyProps) => {
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid, errors },
  } = useForm<EditUserModalType>({
    resolver: zodResolver(EditUserModalSchema),
    defaultValues: { ...userItem, password: '', confirm: '', roles: [] },
  });

  const [fileData, setFileData] = useState<FileList | null>(null);

  const { data: allRolesWithPermission, mutate: mutateRolePermissions } =
    useSWR(
      'userModal_getAllRolesWithPermission ',
      async (_key) => {
        const allData = await getAllRolesWithPermission(_key).then(
          async (res) => await res.json(),
        );
        return allData;
      },
      { fallbackData: () => [] },
    );

  useEffect(() => {
    if (allRolesWithPermission.allUsers && watch('roles')?.length === 0) {
      setValue(
        'roles',
        allRolesWithPermission.allUsers.filter((role) => role.isDefaultUser),
      );
    }
  }, [allRolesWithPermission, watch]);

  const onSubmit = useCallback(
    async (data: Omit<User, 'id'>) => {
      await fectherEditUser({ ...data, image: fileData ? fileData[0] : null });
      mutateAllUsersWithRoles();
      close?.();
    },
    [mutateAllUsersWithRoles, fileData, close],
  );

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit(onSubmit)();
      }}
    >
      <div className={'flex gap-10'}>
        <FileUploader
          labelText="Загрузите картинку профиля"
          files={fileData}
          onChange={(event) => {
            setFileData(event.target.files);
          }}
        />
        <div className={'w-1/2 flex  flex-col gap-5'}>
          <Controller
            control={control}
            name="name"
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
            control={control}
            name="email"
            render={({ field, fieldState, formState }) => {
              return (
                <BaseModalInput
                  {...field}
                  errorText={fieldState.error?.message}
                  label="Email"
                  onChange={(e) => {
                    field.onChange(e.currentTarget.value);
                  }}
                />
              );
            }}
          />
        </div>
      </div>
      <div className={'flex gap-4 mt-4'}>
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState, formState }) => {
            return (
              <BaseModalInput
                {...field}
                className={'w-1/2'}
                type={'password'}
                errorText={fieldState.error?.message}
                label="Пароль"
                onChange={(e) => {
                  field.onChange(e.currentTarget.value);
                }}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="confirm"
          render={({ field, fieldState, formState }) => {
            return (
              <BaseModalInput
                {...field}
                className={'w-1/2'}
                type="password"
                errorText={fieldState.error?.message}
                label="Подтвердите пароль"
                onChange={(e) => {
                  field.onChange(e.currentTarget.value);
                }}
              />
            );
          }}
        />
      </div>
      <Controller
        control={control}
        name="roles"
        render={({ field, fieldState, formState }) => {
          return (
            <Select
              {...field}
              label="Роли"
              className={'mt-4'}
              isMulti={true}
              options={allRolesWithPermission.allUsers}
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
        acceptTitle={userItem ? 'Редактировать' : 'Создать'}
        acceptDisabled={!isValid || isSubmitting}
      />
    </form>
  );
};
