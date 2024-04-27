'use client';
import { DrawerProps } from '@/app/_widget/Drawer/Drawer.types';
import { PropsWithChildren, useMemo } from 'react';
import Show from '@/app/_widget/Show/Show';
import classNames from 'classnames';
import classes from './Drawer.module.scss';

export const Drawer = ({
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
      className={classNames(
        `transition ease-in-out top-0 fixed ${classesForOrientation} z-40 h-screen p-4 overflow-y-auto w-80  bg-white dark:bg-gray-800`,
        classes['drawer-shadow'],
      )}
      aria-labelledby="drawer-right-label"
    >
      <Show when={!!open}>{children}</Show>
    </div>
  );
};
