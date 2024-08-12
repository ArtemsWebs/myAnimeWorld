'use client';
import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface SuccesButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

const SuccesButton = ({
  children,
  className,
  ...props
}: PropsWithChildren<SuccesButtonProps>) => {
  return (
    <button
      className={clsx(
        className,
        'flex w-full justify-center rounded-md bg-indigo-600 disabled:opacity-50 px-3 py-1.5 ext-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default SuccesButton;
