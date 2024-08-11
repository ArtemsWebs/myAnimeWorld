import Typography from '@/app/ui/Typography';
import { FooterButtonsBlock } from '@/app/ui/Modal/components/FooterButtonsBlock';

interface DeleteRoleModalBodyProps {
  close?: () => void;
  mutateRolePermissions: () => void;
  roleId: number;
}

const deleteRole = async (roleId: number) => {
  const url = new URL(
    `${process.env.FRONTEND_BASE_URL}/home/dashboard/roles/api`,
  );

  url.searchParams.append('roleId', String(roleId));

  return await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8', // Indicates the content
    },
  });
};

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
