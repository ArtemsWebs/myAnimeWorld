import Typography from '@/app/ui/Typography';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface InfoRowProps {
  title: string;
  value?: ReactNode;
  className?: string;
  valueClassName?: string;
  titleClassName?: string;
}

const InfoRow = ({
  title,
  value,
  className,
  valueClassName,
  titleClassName,
}: InfoRowProps) => {
  return (
    <p className={className}>
      <Typography
        variant={'subtitle'}
        className={clsx('text-gray-300', titleClassName)}
      >{`${title}: `}</Typography>
      <Typography variant={'regular'} className={clsx(valueClassName)}>
        {value}
      </Typography>
    </p>
  );
};

export default InfoRow;
