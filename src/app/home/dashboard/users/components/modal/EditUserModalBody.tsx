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
import { Select, Show } from '@/app/ui';
import useSWR from 'swr';
import {
  createUser,
  updateUser,
} from '@/app/home/dashboard/users/fetchers/userFetchers';
import { getAllRoles } from '@/app/home/dashboard/fetchers';
import { UserModelResponse } from '@/server/src/user/model/user.model';
import { omit } from 'lodash';
import Checkbox from '@/app/ui/Checkbox/Checkbox';
import PasswordInput from '@/app/ui/PasswordInput/PasswordInput';

interface EditUserModalBodyProps {
  close?: () => void;
  mutateAllUsersWithRoles: () => void;
  userItem?: UserModelResponse;
}

export const EditUserModalBody = ({
  userItem,
  mutateAllUsersWithRoles,
  close,
}: EditUserModalBodyProps) => {
  const {
    control,
    watch,
    setError,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid, errors },
  } = useForm<EditUserModalType>({
    resolver: zodResolver(EditUserModalSchema),
    defaultValues: {
      name: userItem?.name ?? '',
      email: userItem?.email ?? '',
      roles: userItem?.roles ?? [],
    },
  });

  const [fileData, setFileData] = useState<FileList | null>(null);

  const { data: userPhotoFile } = useSWR(
    ['_getPhotoFileForUser', userItem?.image],
    async ([_key, imageUrl]) => {
      if (!imageUrl) {
        return null;
      }
      const responseFile = await fetch(imageUrl, {
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        credentials: 'include',
      });
      const blobFile = await responseFile.blob();
      return new File(
        [blobFile],
        userItem?.userImage?.originalName ?? 'ewfregre',
      );
    },
    {
      onSuccess: (file) => setFileData([file] as unknown as FileList),
    },
  );

  const { data: allRoles } = useSWR(
    'userModal_getAllRolesWithPermission ',
    async (_key) => {
      const { data: allData } = await getAllRoles();
      return allData;
    },
  );

  const accessPassword = watch('accessChangePassword');

  useEffect(() => {
    if (allRoles && watch('roles')?.length === 0) {
      setValue(
        'roles',
        allRoles
          .filter((role) => role.isDefaultUser)
          .map((role) => {
            return omit(role, 'createdAt', 'updatedAt', 'isDefaultUser');
          }),
      );
    }
  }, [allRoles, watch]);

  const onSubmit = useCallback(
    async (data: EditUserModalType) => {
      if (!userItem) {
        if (data.confirm === data.password) {
          await createUser({
            name: data.name,
            roles: data.roles.map((role) => role.id),
            email: data.email,
            hashedPassword: data.password ?? '',
            image: fileData ? fileData[0] : null,
          });
          mutateAllUsersWithRoles();
          close?.();
        } else {
          setError('confirm', {
            message: 'Пароли не совпадают, проверьте правильность ввода',
          });
        }
      } else {
        await updateUser(
          {
            name: data.name,
            roles: data.roles.map((role) => role.id),
            email: data.email,
            hashedPassword: data.password ?? '',
            image: fileData ? fileData[0] : null,
          },
          userItem.id,
        );
        mutateAllUsersWithRoles();
        close?.();
      }
    },
    [mutateAllUsersWithRoles, fileData, close, setError, userItem],
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
          onReset={() => {
            setFileData(null);
          }}
        />
        <div className="w-1/2 flex  flex-col gap-5">
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
      <div className={'flex gap-4 mt-4 mb-4'}>
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState, formState }) => {
            return (
              <PasswordInput
                {...field}
                disabled={userItem && !accessPassword}
                className="w-1/2"
                type="password"
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
              <PasswordInput
                {...field}
                disabled={userItem && !accessPassword}
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
      <Show when={!!userItem}>
        <Controller
          control={control}
          name="accessChangePassword"
          render={({ field }) => {
            return (
              <Checkbox
                checked={field.value}
                label={
                  field.value
                    ? 'Внимание! Вы включили изменение пароля для пользователя'
                    : 'Доступ к изменению пароля пользователя'
                }
                onChange={(value) => {
                  if (!value) {
                    setValue('password', '');
                    setValue('confirm', '');
                  }
                  field.onChange(value);
                }}
              />
            );
          }}
        />
      </Show>
      <Controller
        control={control}
        name="roles"
        render={({ field, fieldState, formState }) => {
          return (
            <div className={'mt-5'}>
              <Select
                {...field}
                label="Роли"
                className={'mt-4 '}
                isMulti={true}
                options={allRoles ?? []}
                getOptionLabel={(val) => val.description ?? ''}
                getOptionValue={(val) => val.name}
                onChange={(newValue, actionMeta) => {
                  field.onChange(newValue);
                }}
              />
            </div>
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
