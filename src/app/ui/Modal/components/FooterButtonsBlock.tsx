import { SuccesButton } from '@/app/ui';
import React, { HTMLAttributes } from 'react';

export interface FooterButtonsBlockProps
  extends HTMLAttributes<HTMLDivElement> {
  onAcceptHandler?: () => void;
  onDeclineHandler?: () => void;
  acceptTitle: string;
  acceptDisabled?: boolean;
  declineTitle: string;
  acceptType?: 'button' | 'submit' | 'reset';
}

export const FooterButtonsBlock = ({
  onAcceptHandler,
  onDeclineHandler,
  acceptDisabled,
  acceptType = 'button',
  acceptTitle,
  declineTitle,
  ...props
}: FooterButtonsBlockProps) => {
  return (
    <div className={'flex  justify-end gap-4 pt-10'} {...props}>
      <SuccesButton
        type={acceptType}
        style={{ width: '25%' }}
        onClick={() => onDeclineHandler?.()}
      >
        {declineTitle}
      </SuccesButton>
      <SuccesButton
        style={{ width: '25%' }}
        disabled={acceptDisabled}
        onClick={() => onAcceptHandler?.()}
      >
        {acceptTitle}
      </SuccesButton>
    </div>
  );
};
