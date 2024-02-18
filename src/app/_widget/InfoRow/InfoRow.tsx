import Typography from '@/app/_widget/Typography';

interface InfoRowProps {
  title: string;
  value?: string | number;
  className?: string;
}

const InfoRow = ({ title, value, className }: InfoRowProps) => {
  return (
    <p className={className}>
      <Typography
        variant={'subtitle'}
        className={'text-gray-300'}
      >{`${title}: `}</Typography>
      <Typography variant={'regular'}>{value}</Typography>
    </p>
  );
};

export default InfoRow;
