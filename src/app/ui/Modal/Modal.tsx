import Typography from '@/app/ui/Typography';
import { PropsWithChildren } from 'react';
import { IconButton } from '@/app/ui';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';
import {
  FooterButtonsBlock,
  FooterButtonsBlockProps,
} from '@/app/ui/Modal/components/FooterButtonsBlock';

interface ModalBaseProps {
  title: string;
  close: () => void;
}

const Modal = ({
  title,
  close,
  children,
}: PropsWithChildren<ModalBaseProps>) => {
  return (
    <div>
      <div
        onClick={() => close()}
        className={
          'w-full  z-[998] bg-black absolute h-screen top-0 transition-opacity duration-300 opacity-0  opacity-50'
        }
      />
      <div
        className={
          'absolute w-full h-screen items-center flex justify-center top-0'
        }
      >
        <div
          className={'bg-white inset-0 z-[999] rounded w-[600px]  p-6 relative'}
        >
          <div className={'flex justify-between pb-3'}>
            <Typography variant={'title'}>{title}</Typography>
            <IconButton onClick={close}>
              <CloseIcon />
            </IconButton>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
