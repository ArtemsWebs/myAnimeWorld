import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface NavbarItemProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  label: string;
}
