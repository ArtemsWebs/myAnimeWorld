'use client';
import { GiEgyptianProfile } from 'react-icons/gi';
import { SiYoutubestudio } from 'react-icons/si';
import { BsFillFileFontFill } from 'react-icons/bs';
import { ReactNode } from 'react';
import SettingsNavbar from '@/app/home/settings/_components/SettingsNavbar/SettingsNavbar';
import { TbLockAccess } from 'react-icons/tb';

import { useCheckAccess } from '@/app/lib/utils/useCheckAccess';
import { Show } from '@/app/ui';

const navbarItems = [
  {
    title: 'Пользователи и роли',
    link: '/home/dashboard/users',
    icon: <GiEgyptianProfile size={24} style={{ color: '#4FD1C5' }} />,
  },
  {
    title: 'Роли и полномочия',
    link: '/home/dashboard/roles',
    icon: <SiYoutubestudio size={20} style={{ color: '#4FD1C5' }} />,
  },
  {
    title: 'Полномочия и описания',
    link: '/home/dashboard/permission',
    icon: <TbLockAccess style={{ color: '#4FD1C5' }} size={24} />,
  },
  {
    title: 'Статистика',
    link: '/home/dashboard/statistic',
    icon: <BsFillFileFontFill style={{ color: '#4FD1C5' }} size={24} />,
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { checkPermission } = useCheckAccess();
  return (
    <Show when={!!checkPermission('USER.CREATE_USER')}>
      <div className="my-[24px] mx-[24px] flex ">
        <SettingsNavbar items={navbarItems} title="Дашборд" />
        <div style={{ width: 'calc(100% - 250px)' }}>{children}</div>
      </div>
    </Show>
  );
}
