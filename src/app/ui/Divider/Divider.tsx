import { DividerProps } from '@/app/ui/Divider/Divider.types';
import clsx from 'clsx';

const Divider = ({ orientation = 'horizontal', ...props }: DividerProps) => {
  return (
    <div
      {...props}
      className={clsx(
        props.className,
        'bg-neutral-300',
        orientation === 'horizontal'
          ? 'w-100 h-[1px] mt-2 mb-2'
          : 'h-100 w-[1px] mt-2 mb-2',
      )}
    />
  );
};

export default Divider;
