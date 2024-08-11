'use client';

import useSWR from 'swr';
import Table from '@/app/ui/Table/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { TbEditCircle } from 'react-icons/tb';
import { AiFillDelete } from 'react-icons/ai';

import Typography from '@/app/ui/Typography';
import InfoRow from '../../../ui/InfoRow/InfoRow';
import { format } from 'date-fns/format';
import { ru } from 'date-fns/locale';
import { Role } from '@/app/store/User.types';
import { IconButton } from '@/app/ui';
import { useContext, useMemo } from 'react';
import { ModalContext } from '@/app/ui/Modal/ModalProvider.config';
import { EditRoleModalBody } from '@/app/home/dashboard/roles/components/modal/EditRoleModalBody';
import CreateButton from '@/app/ui/Buttons/CreateButton';
import { DeleteRoleModalBody } from '@/app/home/dashboard/roles/components/modal/DeleteRoleModalBody';

const getAllRolesWithPermission = async (_key: string) => {
  return await fetch(
    `${process.env.FRONTEND_BASE_URL}/home/dashboard/roles/api`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );
};

const columnHelper = createColumnHelper<Role>();

const columns = [
  columnHelper.accessor('name', {
    header: () => <span>Имя</span>,
    cell: (info) => {
      return <div>{info.getValue()}</div>;
    },
  }),

  columnHelper.accessor('description', {
    header: () => 'Описание',
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor('permission', {
    header: () => 'Полномочия',
    cell: (info) => (
      <div>
        {info.row.original.permission?.map((role) => (
          <InfoRow
            key={role.id}
            title={role.name}
            value={role.description}
            titleClassName={'text-gray-400'}
          />
        ))}
      </div>
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

const Roles = () => {
  const modalContext = useContext(ModalContext);
  const { data: allRolesWithPermission, mutate: mutateRolePermissions } =
    useSWR(
      '_getAllRolesWithPermission ',
      async (_key) => {
        const allData = await getAllRolesWithPermission(_key).then(
          async (res) => await res.json(),
        );
        return allData;
      },
      { fallbackData: () => [] },
    );

  const dynamicColumn = useMemo(
    () =>
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
                    <EditRoleModalBody
                      roleItem={info.row.original}
                      close={close}
                      mutateRolePermissions={() => mutateRolePermissions()}
                      allPermissions={allRolesWithPermission.allPermissions}
                    />
                  ),
                });
              }}
            >
              <div
                className={'w-[30px] h-[30px] flex items-center justify-center'}
              >
                <TbEditCircle size={24} />
              </div>
            </IconButton>
            <IconButton
              onClick={() => {
                modalContext?.open?.({
                  title: 'Удалить роль',
                  bodyComponent: (close) => (
                    <DeleteRoleModalBody
                      close={close}
                      mutateRolePermissions={() => mutateRolePermissions()}
                      roleId={info.row.original.id}
                    />
                  ),
                });
              }}
              title={'Удалить роль'}
            >
              <div
                className={'w-[30px] h-[30px] flex items-center justify-center'}
              >
                <AiFillDelete size={24} />
              </div>
            </IconButton>
          </div>
        ),
      }),
    [
      allRolesWithPermission.allPermissions,
      modalContext,
      mutateRolePermissions,
    ],
  );

  const actualColumns = useMemo(
    () => [...columns, dynamicColumn],
    [dynamicColumn],
  );

  return (
    <>
      <div className="flex items-center justify-between pb-5">
        <Typography variant="title">Роли и полномочия</Typography>
        <CreateButton
          onClick={() => {
            modalContext?.open?.({
              title: 'Создать роль',
              bodyComponent: (close) => (
                <EditRoleModalBody
                  close={close}
                  mutateRolePermissions={() => mutateRolePermissions()}
                  allPermissions={allRolesWithPermission.allPermissions}
                />
              ),
            });
          }}
        >
          Роль
        </CreateButton>
      </div>
      <Table
        columns={actualColumns}
        data={allRolesWithPermission.allUsers ?? []}
      />
    </>
  );
};

export default Roles;
