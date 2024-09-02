import Typography from '@/app/ui/Typography';
import { FooterButtonsBlock } from '@/app/ui/Modal/components/FooterButtonsBlock';
import { deleteUser } from '@/app/home/dashboard/users/fetchers/userFetchers';

interface DeleteRoleModalBodyProps {
  close?: () => void;
  mutateRolePermissions: () => void;
  userId: string;
}

export const DeleteUserModalBody = ({
  close,
  mutateRolePermissions,
  userId,
}: DeleteRoleModalBodyProps) => {
  return (
    <div>
      <Typography variant="button">
        Вы уверены что хотите удалить этого пользователя ?
      </Typography>
      <FooterButtonsBlock
        declineTitle={'Отмена'}
        onDeclineHandler={() => close?.()}
        onAcceptHandler={async () => {
          await deleteUser(userId);
          mutateRolePermissions();
          close?.();
        }}
        acceptTitle={'Удалить'}
      />
    </div>
  );
};
