import Typography from '@/app/ui/Typography';
import { FooterButtonsBlock } from '@/app/ui/Modal/components/FooterButtonsBlock';
import { deleteRole } from '@/app/home/dashboard/roles/fetchers/roleFetchers';

interface DeleteRoleModalBodyProps {
  close?: () => void;
  mutateRolePermissions: () => void;
  roleId: number;
}

export const DeleteRoleModalBody = ({
  close,
  mutateRolePermissions,
  roleId,
}: DeleteRoleModalBodyProps) => {
  return (
    <div>
      <Typography variant="button">
        Вы уверены что хотите удалить эту роль, все полномочия также будут
        удалены ?
      </Typography>
      <FooterButtonsBlock
        declineTitle={'Отмена'}
        onDeclineHandler={() => close?.()}
        onAcceptHandler={async () => {
          await deleteRole(roleId);
          mutateRolePermissions();
          close?.();
        }}
        acceptTitle={'Удалить'}
      />
    </div>
  );
};
