'use client';

import useSWR from 'swr';
import Table from '@/app/ui/Table/Table';
import { createColumnHelper } from '@tanstack/react-table';
import Image from 'next/image';

import Typography from '@/app/ui/Typography';
import { format } from 'date-fns/format';
import { ru } from 'date-fns/locale';
import { Role } from '@/app/store/User.types';
import CreateButton from '@/app/ui/Buttons/CreateButton';
import { useContext, useMemo } from 'react';
import { ModalContext } from '@/app/ui/Modal/ModalProvider.config';
import { EditUserModalBody } from '@/app/home/dashboard/users/components/modal/EditUserModalBody';
import { getAllUser } from '@/app/home/dashboard/users/fetchers/userFetchers';
import { IconButton } from '@/app/ui';
import { TbEditCircle } from 'react-icons/tb';
import { UserTypescriptAnnotation } from '@/server/src/user/model/user.model';

type Person = {
  email: string;
  name: string;
  image?: string;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
};

const columnHelper = createColumnHelper<UserTypescriptAnnotation>();

const columns = [
  columnHelper.accessor('name', {
    header: () => <span>Имя</span>,
    cell: (info) => {
      return (
        <div className={'flex gap-3 items-center'}>
          {info.row.original.image ? (
            <img
              src={info.row.original.image}
              className={'w-[40px] h-[40px] rounded-lg'}
            />
          ) : (
            <Image
              src={'/image/defaultUserIcon.avif'}
              alt={''}
              className={'w-[40px] h-[40px] rounded-lg'}
              width={40}
              height={40}
            />
          )}
          <span>{info.getValue()}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor('email', {
    id: 'email',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Почта</span>,
  }),
  columnHelper.accessor('roles', {
    header: () => 'Роли',
    cell: (info) => (
      <div>
        {info.row.original.roles?.map((role) => role.description).join(', ')}
      </div>
    ),
  }),
  columnHelper.accessor('roles.permission', {
    header: () => 'Роли, системное представление',
    cell: (info) => (
      <div>{info.row.original.roles?.map((role) => role.name).join(', ')}</div>
    ),
  }),
  columnHelper.accessor('createdAt', {
    header: () => <span>Дата создания</span>,
    cell: (info) => (
      <div>
        <Typography variant={'regular'} component={'p'}>
          {format(info.getValue(), 'dd.MM.yyyy', { locale: ru })}
        </Typography>
        <Typography variant={'regular'}>
          {format(info.getValue(), 'в HH:mm', { locale: ru })}
        </Typography>
      </div>
    ),
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Дата последнего обновления',
    cell: (info) => (
      <div>
        <Typography variant={'regular'} component={'p'}>
          {format(info.getValue(), 'dd.MM.yyyy', { locale: ru })}
        </Typography>
        <Typography variant={'regular'}>
          {format(info.getValue(), 'в HH:mm', { locale: ru })}
        </Typography>
      </div>
    ),
  }),
];

const Users = () => {
  const { data: allUsersWithRoles, mutate: mutateAllUsersWithRoles } = useSWR(
    '_getAllUsers',
    async (_key) => {
      const { data: allUsers } = await getAllUser(_key);
      if (allUsers) {
        const usersWithImage = await Promise.all(
          allUsers.map(async (user) => {
            if (user.userImage) {
              return {
                ...user,
                image: `${process.env.FRONTEND_BASE_URL}/api/v1/minio/uploadImageFile/${user.userImage.originalName}`,
              };
            }
            return { ...user };
          }),
        );
        return usersWithImage;
      }
      return [];
    },
  );
  const modalContext = useContext(ModalContext);

  const dynamicColumn = useMemo(
    () => [
      columnHelper.accessor('updatedAt', {
        header: '',
        cell: (info) => (
          <div className={'flex gap-4'}>
            <IconButton
              title={'Редактировать роль'}
              onClick={() => {
                modalContext?.open?.({
                  title: 'Редактировать роль',
                  bodyComponent: (close) => (
                    <EditUserModalBody
                      userItem={info.row.original}
                      close={close}
                      mutateAllUsersWithRoles={() => mutateAllUsersWithRoles()}
                    />
                  ),
                });
              }}
            >
              <div
                className={
                  'w-[30px] h-[30px] rounded-lg flex items-center justify-center'
                }
              >
                <TbEditCircle size={24} color={'green'} />
              </div>
            </IconButton>
            {/*<IconButton*/}
            {/*  onClick={() => {*/}
            {/*    modalContext?.open?.({*/}
            {/*      title: 'Удалить роль',*/}
            {/*      bodyComponent: (close) => (*/}
            {/*        <DeleteRoleModalBody*/}
            {/*          close={close}*/}
            {/*          mutateRolePermissions={() => mutateAllUsersWithRoles()}*/}
            {/*          roleId={info.row.original.id}*/}
            {/*        />*/}
            {/*      ),*/}
            {/*    });*/}
            {/*  }}*/}
            {/*  title={'Удалить роль'}*/}
            {/*>*/}
            {/*  <div*/}
            {/*    className={*/}
            {/*      'w-[30px] h-[30px] rounded-lg flex items-center justify-center'*/}
            {/*    }*/}
            {/*  >*/}
            {/*    <AiFillDelete size={24} className={'fill-red-400'} />*/}
            {/*  </div>*/}
            {/*</IconButton>*/}
          </div>
        ),
      }),
    ],
    [modalContext, mutateAllUsersWithRoles],
  );
  return (
    <>
      <div className="flex items-center justify-between pb-5">
        <Typography variant="title">Пользователи и роли</Typography>
        <CreateButton
          onClick={() => {
            modalContext?.open?.({
              title: 'Создать пользователя',
              bodyComponent: (close) => (
                <EditUserModalBody
                  close={close}
                  mutateAllUsersWithRoles={() => mutateAllUsersWithRoles()}
                />
              ),
            });
          }}
        >
          Пользователь
        </CreateButton>
      </div>

      <Table
        columns={[...columns, ...dynamicColumn]}
        data={allUsersWithRoles ?? []}
      />
    </>
  );
};

export default Users;
