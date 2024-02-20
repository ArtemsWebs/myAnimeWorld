import { HTMLAttributes, ReactNode, useState } from 'react';
import Typography from '@/app/_widget/Typography';
import Show from '@/app/_widget/Show/Show';
import classNames from 'classnames';
import { IoIosArrowDown } from 'react-icons/io';
import IconButton from '@/app/_widget/IconButton/IconButton';

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
        'w-full min-h-5 bg-gray-400 rounded-lg px-6 py-8',
      )}
    >
      <div className={'flex items-center gap-10'}>
        <Typography variant={'title'} className={'text-white'}>
          {title}
        </Typography>
        <IconButton
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
