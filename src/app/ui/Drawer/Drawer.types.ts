export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  orientation?: 'left' | 'right';
}
