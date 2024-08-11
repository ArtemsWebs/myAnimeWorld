import Typography from '@/app/ui/Typography';
import { FooterButtonsBlock } from '@/app/ui/Modal/components/FooterButtonsBlock';

interface DeletePermissionModalBody {
  close?: () => void;
  mutateRolePermissions: () => void;
  permissionId: number;
}

const deletePermission = async (roleId: number) => {
  const url = new URL(
    `${process.env.FRONTEND_BASE_URL}/home/dashboard/permission/api`,
  );

  url.searchParams.append('permissionId', String(roleId));

  return await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8', // Indicates the content
    },
  });
};

export const DeletePermissionModalBody = ({
  close,
  mutateRolePermissions,
  permissionId,
}: DeletePermissionModalBody) => {
  return (
    <div>
      <Typography variant="button">
        Вы уверены что хотите удалить это полномочие, оно также будет удалено у
        всех ролей?
      </Typography>
      <FooterButtonsBlock
        declineTitle={'Отмена'}
        onDeclineHandler={() => close?.()}
        onAcceptHandler={async () => {
          await deletePermission(permissionId);
          mutateRolePermissions();
          close?.();
        }}
        acceptTitle={'Удалить'}
      />
    </div>
  );
};
