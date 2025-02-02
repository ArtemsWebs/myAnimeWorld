'use client';
import Typography from '@/app/ui/Typography';
import { PropsWithChildren, useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface SettingBLockProps {
  title: string;
  className?: string;
  hrefToLink: string;
  titleClassName?: string;
}

const SettingBLock = ({
  title,
  children,
  className,
  hrefToLink,
  titleClassName,
}: PropsWithChildren<SettingBLockProps>) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={clsx(
        'setting-block bg-slate-50 px-5 py-6 rounded-lg drop-shadow-md w-[572px] h-[377px] max-w-[572px] w-full h-full hover:cursor-pointer hover:drop-shadow-2xl',
        className,
      )}
    >
      <div>
        <Typography component="p" variant="title" className={titleClassName}>
          {title}
        </Typography>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default SettingBLock;
