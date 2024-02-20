import { HTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClick: () => void;
}

const IconButton = ({ children, onClick, ...props }: IconButtonProps) => {
  return <div onClick={onClick}>{children}</div>;
};

export default IconButton;
