'use client';
import { HTMLAttributes, useState } from 'react';
import Typography from '@/app/ui/Typography';
import Show from '@/app/ui/Show/Show';
import classNames from 'classnames';
import { IoIosArrowDown } from 'react-icons/io';
import IconButton from '@/app/ui/IconButton/IconButton';

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  className?: string;
}

const Accordion = ({
  children,
  title,
  className,
  ...props
}: AccordionProps) => {
  const [visibleContent, setVisibleContent] = useState(false);
  return (
    <div
      {...props}
      className={classNames(
        className,
        'w-full min-h-5 bg-gray-400 rounded-lg px-6 py-6',
      )}
    >
      <div className={'flex justify-between items-center gap-10'}>
        <Typography variant={'title'} className={'text-white'}>
          {title}
        </Typography>
        <IconButton
          className={`transition duration-300 ${visibleContent ? 'rotate-0' : 'rotate-180'}`}
          onClick={() => setVisibleContent((prevState) => !prevState)}
        >
          <IoIosArrowDown width={'24px'} height={'24px'} />
        </IconButton>
      </div>
      <Show when={visibleContent}>{children}</Show>
    </div>
  );
};

export default Accordion;
