'use client';
import { DrawerProps } from '@/app/ui/Drawer/Drawer.types';
import { PropsWithChildren, useMemo } from 'react';
import Show from '@/app/ui/Show/Show';
import classes from './Drawer.module.scss';
import clsx from 'clsx';

const Drawer = ({
  open,
  onClose,
  orientation = 'right',
  children,
}: PropsWithChildren<DrawerProps>) => {
  const classesForOrientation = useMemo(() => {
    if (orientation === 'left') {
      return `${open ? 'translate-x-0' : '-translate-x-80'}`;
    }
    return `right-0 ${open ? 'translate-x-0' : 'translate-x-80'}`;
  }, [orientation, open]);

  return (
    <div
      className={clsx(
        classes['drawer-shadow'],
        `transition ease-in-out top-0 fixed ${classesForOrientation} z-40 h-screen p-4 overflow-y-auto w-80  bg-white dark:bg-gray-800`,
      )}
      aria-labelledby="drawer-right-label"
    >
      <Show when={open}>{children}</Show>
    </div>
  );
};

export default Drawer;
