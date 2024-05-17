'use client';
import { NavbarItem } from '@/app/home/settings/_components/SettingsNavbar/type';
import SettingsNavbarItem from './SettingsNavbarItem';
import { useState } from 'react';
import { Divider } from '@/app/ui';
import { TbSettingsHeart } from 'react-icons/tb';

import Typography from '@/app/ui/Typography';
import clsx from 'clsx';

interface SettingsNavbar {
  items: NavbarItem[];
  className?: string;
}

const SettingsNavbar = ({ items, className }: SettingsNavbar) => {
  const [activeItems, setActiveItems] = useState<NavbarItem[]>([]);

  console.log(activeItems);

  return (
    <div className={clsx('flex-col gap-3 w-[250px] pr-6', className)}>
      <div className="flex gap-3 items-center">
        <TbSettingsHeart size={40} />
        <Typography variant="title">Настройки</Typography>
      </div>
      <Divider />
      {items.map((item) => (
        <SettingsNavbarItem
          key={item.title}
          item={item}
          activeItems={activeItems}
          onChangeActive={(item: NavbarItem) => {
            setActiveItems((prevState) => {
              if (prevState.length === 2) {
                const deleteFirst = prevState.slice(-1);
                return [...deleteFirst, item];
              } else {
                return [...prevState, item];
              }
            });
          }}
        />
      ))}
    </div>
  );
};

export default SettingsNavbar;
