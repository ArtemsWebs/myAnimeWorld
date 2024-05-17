import Typography from '@/app/ui/Typography';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';

interface SettingBLockProps {
  title: string;
  className?: string;
  titleClassName?: string;
}

const SettingBLock = ({
  title,
  children,
  className,
  titleClassName,
}: PropsWithChildren<SettingBLockProps>) => {
  return (
    <div
      className={clsx(
        'setting-block bg-slate-50 px-5 py-6 rounded-lg drop-shadow-md w-[572px] h-[377px] max-w-[572px]',
        className,
      )}
    >
      <Typography component="p" variant="title" className={titleClassName}>
        {title}
      </Typography>
      <div>{children}</div>
    </div>
  );
};

export default SettingBLock;
