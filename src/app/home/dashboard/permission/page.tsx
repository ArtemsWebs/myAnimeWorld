'use client';

import useSWR from 'swr';
import Table from '@/app/ui/Table/Table';
import { createColumnHelper } from '@tanstack/react-table';

import Typography from '@/app/ui/Typography';
import { format } from 'date-fns/format';
import { ru } from 'date-fns/locale';
import { Permission } from '@/app/store/User.types';
import { useContext, useMemo } from 'react';
import { IconButton } from '@/app/ui';
import { TbEditCircle } from 'react-icons/tb';
import { AiFillDelete } from 'react-icons/ai';
import { ModalContext } from '@/app/ui/Modal/ModalProvider.config';
import { DeletePermissionModalBody } from '@/app/home/dashboard/permission/components/modal/DeletePermissionModalBody';
import { EditPermissionModalBody } from '@/app/home/dashboard/permission/components/modal/EditPermissionModalBody';
import CreateButton from '@/app/ui/Buttons/CreateButton';
import { getAllPermissions } from './fetchers/permissionFetchers';

const columnHelper = createColumnHelper<Permission>();

const columns = [
  columnHelper.accessor('name', {
    header: () => <span>Имя</span>,
    cell: (info) => {
      return <div>{info.getValue()}</div>;
    },
  }),
  columnHelper.accessor('description', {
    id: 'description',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Описание</span>,
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

const Permissions = () => {
  const { data: allPermissions, mutate: mutatePermission } = useSWR(
    '_getAllPermission',
    async (_key) => {
      const { data: allPermissions } = await getAllPermissions();
      return allPermissions;
    },
  );

  const modalContext = useContext(ModalContext);

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
                    <EditPermissionModalBody
                      permissionItem={info.row.original}
                      close={close}
                      mutatePermissions={() => mutatePermission()}
                    />
                  ),
                });
              }}
            >
              <div
                className={'w-[30px] h-[30px] flex items-center justify-center'}
              >
                <TbEditCircle size={24} color={'green'} />
              </div>
            </IconButton>
            <IconButton
              onClick={() => {
                modalContext?.open?.({
                  title: 'Удалить роль',
                  bodyComponent: (close) => (
                    <DeletePermissionModalBody
                      close={close}
                      mutateRolePermissions={() => mutatePermission()}
                      permissionId={info.row.original.id}
                    />
                  ),
                });
              }}
              title={'Удалить роль'}
            >
              <div
                className={'w-[30px] h-[30px] flex items-center justify-center'}
              >
                <AiFillDelete size={24} className={'fill-red-400'} />
              </div>
            </IconButton>
          </div>
        ),
      }),
    [modalContext, mutatePermission],
  );

  const actualColumns = useMemo(
    () => [...columns, dynamicColumn],
    [dynamicColumn],
  );

  return (
    <>
      <div className="flex items-center justify-between pb-5">
        <Typography variant="title">Полномочия и описание</Typography>
        <CreateButton
          onClick={() => {
            modalContext?.open?.({
              title: 'Создать полномочие',
              bodyComponent: (close) => (
                <EditPermissionModalBody
                  close={close}
                  mutatePermissions={() => mutatePermission()}
                />
              ),
            });
          }}
        >
          Полномочие
        </CreateButton>
      </div>
      <Table columns={actualColumns} data={allPermissions ?? []} />
    </>
  );
};

export default Permissions;
