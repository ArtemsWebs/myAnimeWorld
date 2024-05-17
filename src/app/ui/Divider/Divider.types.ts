import { HtmlHTMLAttributes } from 'react';

export interface DividerProps extends HtmlHTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}
