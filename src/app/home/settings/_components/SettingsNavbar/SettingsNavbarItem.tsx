import { NavbarItem } from '@/app/home/settings/_components/SettingsNavbar/type';
import Typography from '@/app/ui/Typography';
import Link from 'next/link';
import clsx from 'clsx';
import classes from './SettingsNavbar.module.scss';

interface SettingsNavbarItemProps {
  item: NavbarItem;
  activeItems: NavbarItem[];
  titleLengthModify: number;
  onChangeActive: (item: NavbarItem) => void;
}

const getAnimationForText = (
  titleLengthModify: number,
  type: 'animation' | 'reverse',
) => {
  const textLenghtInPx = titleLengthModify * 18;
  console.log(titleLengthModify);
  if (textLenghtInPx <= 200) {
    return type === 'animation'
      ? 'setting-navbar-item-animation-200'
      : 'setting-navbar-item-reverse-200';
  } else if (textLenghtInPx > 200 && textLenghtInPx < 250) {
    return type === 'animation'
      ? 'setting-navbar-item-animation-250'
      : 'setting-navbar-item-reverse-250';
  } else
    return type === 'animation'
      ? 'setting-navbar-item-animation-250'
      : 'setting-navbar-item-reverse-250';
};

const SettingsNavbarItem = ({
  item,
  activeItems,
  titleLengthModify,
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
            ' bg-white  flex items-center w-[30px] h-[30px] justify-center shadow-xl rounded-lg p-[4px] whitespace-nowrap overflow-ellipsis',
            classes['setting-navbar-item'],
            isActive &&
              classes[getAnimationForText(titleLengthModify, 'animation')],
            !isActive &&
              item.title === activeItems[0]?.title &&
              classes[getAnimationForText(titleLengthModify, 'reverse')],
          )}
        >
          <div>{item.icon}</div>
          <Typography
            variant="subtitle"
            component="p"
            className={clsx(
              'text-gray-400 absolute left-[46px] overflow-ellipsis overflow-hidden whitespace-nowrap w-3/4',
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
