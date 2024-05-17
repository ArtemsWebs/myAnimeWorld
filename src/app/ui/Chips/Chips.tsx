import Typography from '@/app/ui/Typography';
import { HTMLAttributes } from 'react';
import classes from './Chips.module.css';

interface ChipsProps extends HTMLAttributes<HTMLDivElement> {
  chipsName: string;
  onChipsClick?: () => void;
}

const Chips = ({ chipsName, onChipsClick, ...props }: ChipsProps) => {
  return (
    <div
      className={`border-2 border-cyan-300 rounded-lg px-1 py-1 w-fit cursor-pointer transition ease-in-out duration-500  hover:bg-cyan-300 hover:text-black ${classes.animated}`}
      onClick={onChipsClick}
      {...props}
    >
      <Typography variant="regular">{chipsName}</Typography>
    </div>
  );
};

export default Chips;
