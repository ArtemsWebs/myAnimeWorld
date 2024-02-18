import { HTMLAttributes, ReactNode, useMemo } from 'react';

type TypographyVariant = 'title' | 'subtitle' | 'button' | 'regular';

interface TypographyProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant: TypographyVariant;
  className?: string;
}

const Typography = ({ children, variant, ...props }: TypographyProps) => {
  const classNamesForSpan = useMemo(() => {
    switch (variant) {
      case 'title':
        return 'text-2xl font-bold';
      case 'subtitle':
        return 'text-lg font-medium';
      case 'regular':
        return 'text-base font-normal';
    }
  }, [variant]);
  return (
    <span
      {...props}
      className={`${classNamesForSpan} ${props.className ?? ''}`}
    >
      {children}
    </span>
  );
};

export default Typography;
