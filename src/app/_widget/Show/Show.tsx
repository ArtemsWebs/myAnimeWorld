import { ShowProps } from '@/app/_widget/Show/Show.types';

const Show = ({ when, children }: ShowProps) => {
  return <>{when ? children : undefined}</>;
};

export default Show;
