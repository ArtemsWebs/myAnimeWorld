import { HTMLAttributes, ReactNode } from 'react';
import classes from './IconButton.module.scss';
import clsx from 'clsx';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  iconSize?: { width: string; height: string };
}

const IconButton = ({
  children,
  onClick,
  active,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        classes['icon-wrapper'],
        classes[active ? 'active' : ''],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
