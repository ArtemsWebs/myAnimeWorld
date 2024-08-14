import clsx from 'clsx';
import Typography from '../Typography';
import { ToggleButtonOption } from './type';

interface ToggleButtonItemProps extends ToggleButtonOption {
  active: boolean;
}

const ToggleButtonItem = ({
  onClick,
  label,
  icon,
  active,
}: ToggleButtonItemProps) => {
  return (
    <div
      className={clsx(
        'flex p-4 gap-3 justify-center items-center rounded-md cursor-pointer ',
        active && 'bg-white drop-shadow-lg',
      )}
      onClick={onClick}
    >
      {icon}
      <Typography component="p" variant="regular">
        {label}
      </Typography>
    </div>
  );
};

export default ToggleButtonItem;
