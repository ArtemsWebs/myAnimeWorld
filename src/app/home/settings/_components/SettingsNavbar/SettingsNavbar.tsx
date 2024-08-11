'use client';
import { NavbarItem } from '@/app/home/settings/_components/SettingsNavbar/type';
import SettingsNavbarItem from './SettingsNavbarItem';
import { useMemo, useState } from 'react';
import { Divider } from '@/app/ui';
import { TbSettingsHeart } from 'react-icons/tb';

import Typography from '@/app/ui/Typography';
import clsx from 'clsx';

interface SettingsNavbar {
  items: NavbarItem[];
  title?: string;
  className?: string;
}

const SettingsNavbar = ({ items, title, className }: SettingsNavbar) => {
  const [activeItems, setActiveItems] = useState<NavbarItem[]>([items[0]]);

  const biggestItemTitleLength = useMemo(() => {
    let max = 0;
    items.forEach((elem) => {
      if (elem.title.length > max) {
        max = elem.title.length;
      }
    });
    return max;
  }, [items]);

  return (
    <div className={clsx('flex-col gap-3 min-w-[300px] pr-6', className)}>
      <div className="flex gap-3 items-center">
        <TbSettingsHeart size={40} />
        <Typography variant="title">{title ?? 'Настройки'}</Typography>
      </div>
      <Divider />
      {items.map((item) => (
        <SettingsNavbarItem
          key={item.title}
          item={item}
          titleLengthModify={biggestItemTitleLength}
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
