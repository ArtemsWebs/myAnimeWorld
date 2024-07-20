import { GiEgyptianProfile } from 'react-icons/gi';
import { SiYoutubestudio } from 'react-icons/si';
import { BsFillFileFontFill } from 'react-icons/bs';
import { ReactNode } from 'react';
import SettingsNavbar from '@/app/home/settings/_components/SettingsNavbar/SettingsNavbar';

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
  return (
    <div className="my-[24px] mx-[24px] flex ">
      <SettingsNavbar items={navbarItems} />
      <div style={{ width: 'calc(100% - 250px)' }}>{children}</div>
    </div>
  );
}
