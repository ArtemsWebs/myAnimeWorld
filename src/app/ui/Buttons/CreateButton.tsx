'use client';
import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { FaPlus } from 'react-icons/fa6';

interface CreateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

const CreateButton = ({
  children,
  className,
  ...props
}: PropsWithChildren<CreateButtonProps>) => {
  return (
    <button
      className={clsx(
        'flex items-center gap-4 max-w-[170px] justify-center rounded-md bg-green-500 px-3 py-1.5 ext-sm font-semibold leading-6 text-white ' +
          'shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600',
        className,
      )}
      {...props}
    >
      <FaPlus color={'white'} />
      {children}
    </button>
  );
};

export default CreateButton;
