import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import Modal from '@/app/ui/Modal/Modal';
import { ModalContext } from '@/app/ui/Modal/ModalProvider.config';

type ModalType = {
  modalId: string;
  title: string;
  bodyComponent: (close: () => void) => ReactNode;
};

export const generateUniqueID = () => {
  return `v2-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
};
export const ModalProvider = ({ children }: PropsWithChildren<any>) => {
  const [modals, setModals] = useState<ModalType[]>([]);

  const close = useCallback((modalId: string) => {
    setModals((prevState) => {
      return prevState.filter((modal) => modal.modalId !== modalId);
    });
  }, []);

  const open = useCallback(
    ({ title, bodyComponent }: Omit<ModalType, 'modalId'>) => {
      const uniqueModalId = generateUniqueID();
      return setModals((prevState) => [
        ...prevState,
        {
          modalId: uniqueModalId,
          bodyComponent: () => bodyComponent(() => close(uniqueModalId)),
          title: title,
        },
      ]);
    },
    [close],
  );

  const contextValue = useMemo(
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modals.map((modal) => (
        <Modal
          title={modal.title}
          key={modal.modalId}
          close={() => close(modal.modalId)}
        >
          {modal?.bodyComponent?.(() => close(modal.modalId))}
        </Modal>
      ))}
    </ModalContext.Provider>
  );
};
