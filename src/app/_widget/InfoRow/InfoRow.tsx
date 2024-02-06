interface InfoRowProps {
  title: string;
  value?: string | number;
}

const InfoRow = ({ title, value }: InfoRowProps) => {
  return <p>{`${title}: ${value}`}</p>;
};

export default InfoRow;
