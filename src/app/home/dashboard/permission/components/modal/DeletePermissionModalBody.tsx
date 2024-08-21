import Typography from '@/app/ui/Typography';
import { FooterButtonsBlock } from '@/app/ui/Modal/components/FooterButtonsBlock';
import { deletePermission } from '@/app/home/dashboard/permission/fetchers/permissionFetchers';

interface DeletePermissionModalBody {
  close?: () => void;
  mutateRolePermissions: () => void;
  permissionId: number;
}

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
