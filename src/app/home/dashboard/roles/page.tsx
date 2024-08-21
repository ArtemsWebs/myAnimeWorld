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
import { getAllRoles } from '@/app/home/dashboard/roles/fetchers/roleFetchers';

const columnHelper = createColumnHelper<Role>();

const columns = [
  columnHelper.accessor('isDefaultUser', {
    header: '',
    cell: (info) => {
      return (
        <>
          {info.getValue() && (
            <img
              src={'https://media.tenor.com/yD41WikeBSEAAAAi/wsgrhh.gif'}
              className={'w-[50px] h-[50px]'}
              title={
                'Данная роль будет использована как дефолтная при регистрации пользователя или подставляться автоматически при создание пользователя из дашборда'
              }
            />
            // <Image
            //   title={
            //     'Данная роль будет использована как дефолтная при регистрации пользователя или подставляться автоматически при создание пользователя из дашборда'
            //   }
            //   src={'/icons/isDefaultRole.ico'}
            //   width={50}
            //   height={50}
            //   alt={''}
            // />
          )}
        </>
      );
    },
  }),

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
    useSWR('_getAllRolesWithPermission ', async (_key) => {
      const { data: roles } = await getAllRoles();
      return roles;
    });

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
                      allPermissions={allRolesWithPermission ?? []}
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
                className={
                  'w-[30px] h-[30px] rounded-lg flex items-center justify-center'
                }
              >
                <AiFillDelete size={24} className={'fill-red-400'} />
              </div>
            </IconButton>
          </div>
        ),
      }),
    [allRolesWithPermission, modalContext, mutateRolePermissions],
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
                  allPermissions={allRolesWithPermission ?? []}
                />
              ),
            });
          }}
        >
          Роль
        </CreateButton>
      </div>
      <Table
        getRowClassName={(row: any) =>
          row.original.isDefaultUser && '!bg-green-200'
        }
        columns={actualColumns}
        data={allRolesWithPermission ?? []}
      />
    </>
  );
};

export default Roles;
