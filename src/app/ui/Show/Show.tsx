import { ShowProps } from '@/app/ui/Show/Show.types';

const Show = ({ when, children }: ShowProps) => {
  return <>{when ? children : undefined}</>;
};

export default Show;
