'use client';
import SettingsNavbar from './_components/SettingsNavbar/SettingsNavbar';
import { GiEgyptianProfile } from 'react-icons/gi';
import { SiYoutubestudio } from 'react-icons/si';
import { BsFillFileFontFill } from 'react-icons/bs';
import { ReactNode } from 'react';

const navbarItems = [
  {
    title: 'Профиль',
    link: '/home/settings/profile',
    icon: <GiEgyptianProfile size={24} style={{ color: '#4FD1C5' }} />,
  },
  {
    title: 'Мультимедиа',
    link: '/home/settings/video',
    icon: <SiYoutubestudio size={20} style={{ color: '#4FD1C5' }} />,
  },
  {
    title: 'Шрифт и фон',
    link: '/home/settings/fontsBg',
    icon: <BsFillFileFontFill style={{ color: '#4FD1C5' }} size={24} />,
  },
];

export default function SettingsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="my-[24px] mx-[24px] flex ">
      <SettingsNavbar items={navbarItems} />
      {/*<Divider orientation="vertical" />*/}
      <div style={{ width: 'calc(100% - 250px)' }}>{children}</div>
    </div>
  );
}
