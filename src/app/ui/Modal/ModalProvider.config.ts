import { createContext, ReactNode } from 'react';

type ModalOpenProps = {
  title: string;
  bodyComponent: (close: () => void) => ReactNode;
};

interface ModalContextType {
  open?: ({ title, bodyComponent }: ModalOpenProps) => void;
  close?: () => void;
}

export const ModalContext = createContext<ModalContextType>({});
