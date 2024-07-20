import Drawer from '@/app/ui/Drawer/Drawer';
import { getSession, signOut } from 'next-auth/react';
import useSWR from 'swr';
import Typography from '@/app/ui/Typography';
import { Divider } from '@/app/ui/index';
import { CiSettings } from 'react-icons/ci';
import Link from 'next/link';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';
import IconButton from '@/app/ui/IconButton/IconButton';
import Image from 'next/image';

interface UserDrawerProps {
  openDrawer: boolean;
  onClose?: () => void;
}

const userSettings = [
  {
    label: 'Настройки',
    icon: <CiSettings className={'w-[24px] h-[24px]'} />,
    link: '/home/settings',
  },
];

export const UserDrawer = ({ openDrawer, onClose }: UserDrawerProps) => {
  const { data: session } = useSWR(
    '_session',
    async (_key) => await getSession(),
  );

  return (
    <Drawer open={openDrawer} onClose={onClose}>
      <div className={'flex gap-5'}>
        {session?.user?.image ? (
          <img
            src={session.user.image}
            width={40}
            height={40}
            className={'rounded-full w-[40px] h-[40px]'}
            alt={''}
          />
        ) : (
          <Image
            src={
              session?.user?.image
                ? session.user.image
                : '/image/defaultUserIcon.avif'
            }
            width={40}
            height={40}
            alt={''}
            className={'rounded-full w-[40px] h-[40px]'}
          />
        )}
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
            key={setting.label + setting.link}
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
      <Divider />
      <button
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `${process.env.FRONTEND_BASE_URL}/auth`,
          })
        }
      >
        Выйти
      </button>
    </Drawer>
  );
};
