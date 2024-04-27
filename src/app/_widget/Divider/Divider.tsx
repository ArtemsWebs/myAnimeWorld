import { DividerProps } from '@/app/_widget/Divider/Divider.types';
import classnames from 'classnames';

export const Divider = ({ orientation = 'horizontal' }: DividerProps) => {
  let classes = '';
  if (orientation === 'horizontal') {
    classes = 'w-100 h-[1px] mt-2 mb-2';
  } else {
    classes = 'h-100 w-[1px] mt-2 mb-2';
  }
  return <div className={classnames(classes, 'bg-neutral-300')} />;
};
