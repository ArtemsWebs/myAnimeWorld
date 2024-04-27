import { Drawer } from '@/app/_widget/Drawer/Drawer';
import { getSession } from 'next-auth/react';
import useSWR from 'swr';
import Typography from '@/app/_widget/Typography';
import { Divider } from '@/app/_widget/Divider/Divider';
import { CiSettings } from 'react-icons/ci';
import Link from 'next/link';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';
import IconButton from '@/app/_widget/IconButton/IconButton';

interface UserDrawerProps {
  openDrawer: boolean;
  onClose?: () => void;
}

const userSettings = [
  {
    label: 'Настройки',
    icon: <CiSettings className={'w-[24px] h-[24px]'} />,
    link: '/settings',
  },
];

export const UserDrawer = ({ openDrawer, onClose }: UserDrawerProps) => {
  const { data: session } = useSWR(
    '_session',
    async (_key) => await getSession(),
  );
  return (
    <Drawer open={openDrawer}>
      <div className={'flex gap-5'}>
        <img
          src={session?.user?.image ?? undefined}
          className={'rounded-full w-[40px] h-[40px] '}
        />
        <div>
          <Typography variant="subtitle" component={'p'}>
            {session?.user?.name}
          </Typography>
          <Typography variant="regular" component={'p'}>
            {session?.user?.email}
          </Typography>
        </div>
        <IconButton onClick={() => onClose?.()}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <div>
        {userSettings.map((setting) => (
          <div
            className={
              'w-full transition-colors duration-200 hover:bg-neutral-200 rounded-lg p-1'
            }
          >
            <Link href={setting.link}>
              <div className={'flex items-center gap-1'}>
                {setting.icon}
                <Typography variant="regular">{setting.label}</Typography>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Drawer>
  );
};
