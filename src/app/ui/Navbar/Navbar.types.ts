import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react';

export interface NavbarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  menuItems: (BaseOption<string> & { route: string })[];
  navbarStyles?: CSSProperties;
  itemStyles?: CSSProperties;
}

export type BaseOption<T extends any> = {
  key: string;
  value: T;
};
