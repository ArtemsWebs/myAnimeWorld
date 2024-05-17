import { HTMLAttributes, ReactNode, useMemo } from 'react';

type TypographyVariant = 'title' | 'subtitle' | 'button' | 'regular';

interface TypographyProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  component?: 'p' | 'span';
  variant: TypographyVariant;
  className?: string;
}

const Typography = ({
  children,
  variant,
  component = 'span',
  ...props
}: TypographyProps) => {
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
    <>
      {component === 'span' ? (
        <span
          {...props}
          className={`${classNamesForSpan} ${props.className ?? ''}`}
        >
          {children}
        </span>
      ) : (
        <p
          {...props}
          className={`${classNamesForSpan} ${props.className ?? ''}`}
        >
          {children}
        </p>
      )}
    </>
  );
};
export default Typography;
