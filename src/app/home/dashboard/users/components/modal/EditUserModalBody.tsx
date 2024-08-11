import { User } from 'next-auth';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditUserModalSchema } from '@/app/home/dashboard/users/components/schema/EditUserModal.schema';
import BaseModalInput from '@/app/ui/BaseModalInput/BaseModalInput';
import React, { useCallback, useState } from 'react';
import { FooterButtonsBlock } from '@/app/ui/Modal/components/FooterButtonsBlock';
import FileUploader from '@/app/ui/FileUploader';

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
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(EditUserModalSchema),
    defaultValues: { ...userItem },
  });

  const [fileData, setFileData] = useState<FileList | null>(null);

  console.log(fileData);

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
                  label="email"
                  onChange={(e) => {
                    field.onChange(e.currentTarget.value);
                  }}
                />
              );
            }}
          />
        </div>
      </div>
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
