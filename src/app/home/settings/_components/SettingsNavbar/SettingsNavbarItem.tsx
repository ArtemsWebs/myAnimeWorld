import { NavbarItem } from '@/app/home/settings/_components/SettingsNavbar/type';
import Typography from '@/app/ui/Typography';
import Link from 'next/link';
import clsx from 'clsx';
import classes from './SettingsNavbar.module.scss';

interface SettingsNavbarItemProps {
  item: NavbarItem;
  activeItems: NavbarItem[];
  onChangeActive: (item: NavbarItem) => void;
}

const SettingsNavbarItem = ({
  item,
  activeItems,
  onChangeActive,
}: SettingsNavbarItemProps) => {
  const isActive = activeItems[1]?.title === item.title;
  return (
    <Link href={item.link}>
      <div
        className="px-2 py-2 flex gap-[12px] cursor-pointer relative"
        onClick={() => {
          if (!isActive) onChangeActive(item);
        }}
      >
        <div
          className={clsx(
            ' bg-white  flex items-center w-[30px] h-[30px] justify-center shadow-xl rounded-lg p-[4px]',
            classes['setting-navbar-item'],
            isActive && classes['setting-navbar-item-animation'],
            !isActive &&
              item.title === activeItems[0]?.title &&
              classes['setting-navbar-item-reverse'],
          )}
        >
          <div>{item.icon}</div>
          <Typography
            variant="subtitle"
            component="p"
            className={clsx(
              'text-gray-400 absolute left-[46px]',
              isActive && classes['setting-navbar-item-text-active-color'],
              !isActive &&
                item.title === activeItems[0]?.title &&
                classes['setting-navbar-item-text-inactive-color'],
            )}
          >
            {item.title}
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default SettingsNavbarItem;
