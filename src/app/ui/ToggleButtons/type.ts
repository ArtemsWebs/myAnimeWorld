import { ReactNode } from 'react';

export type ToggleButtonOption = {
  onClick: () => void;
  label: string;
  icon: ReactNode;
};
