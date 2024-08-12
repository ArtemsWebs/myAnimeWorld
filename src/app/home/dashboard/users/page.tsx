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
import { useContext } from 'react';
import { ModalContext } from '@/app/ui/Modal/ModalProvider.config';
import { EditUserModalBody } from '@/app/home/dashboard/users/components/modal/EditUserModalBody';

const getAllUser = async (_key: string) => {
  return await fetch(
    `${process.env.FRONTEND_BASE_URL}/home/dashboard/users/api`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );
};

type Person = {
  email: string;
  name: string;
  image?: string;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
};

const columnHelper = createColumnHelper<Person>();

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
      const allUsers = await getAllUser(_key).then(
        async (res) => await res.json(),
      );

      const usersWithImage = await Promise.all(
        allUsers.map(async (user: any) => {
          if (user.userImage) {
            const url = new URL(
              `${process.env.FRONTEND_BASE_URL}/home/api/file/`,
            );
            url.searchParams.append(
              'fileName',
              String(user.userImage.originalName),
            );

            const response = await fetch(url, { method: 'GET' }).then(
              (res) => res,
            );
            const blob = await response.blob();
            return { ...user, image: URL.createObjectURL(blob) };
          }
          return { ...user };
        }),
      );
      return usersWithImage;
    },
    { fallbackData: () => [] },
  );
  const modalContext = useContext(ModalContext);
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

      <Table columns={columns} data={allUsersWithRoles} />
    </>
  );
};

export default Users;
