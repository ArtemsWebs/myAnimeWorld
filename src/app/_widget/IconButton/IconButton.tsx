import { HTMLAttributes, ReactNode } from 'react';
import classes from './IconButton.module.scss';
import classNames from 'classnames';

interface IconButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClick: () => void;
  iconSize?: { width: string; height: string };
}

const IconButton = ({
  children,
  onClick,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <div
      {...props}
      className={classNames(classes['icon-wrapper'], className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default IconButton;
