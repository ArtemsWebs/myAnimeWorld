import {
  DetailedHTMLProps,
  FormEvent,
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';
import Typography from '@/app/ui/Typography';
import clsx from 'clsx';

interface BaseModalInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  className?: string;
  inputStyles?: string;
  labelClassNames?: string;
  errorText?: string;
}

const BaseModalInput: ForwardRefRenderFunction<
  HTMLInputElement,
  BaseModalInputProps
> = (
  {
    label,
    onChange,
    errorText,
    inputStyles,
    labelClassNames,
    className,
    type = 'text',
    ...props
  },
  ref,
) => {
  return (
    <div className={className}>
      <label
        htmlFor="first_name"
        className={clsx(
          'block mb-2 text-sm font-medium text-gray-900',
          labelClassNames,
        )}
      >
        {label}
      </label>
      <input
        ref={ref}
        {...props}
        onChange={onChange}
        type={type}
        id="first_name"
        className={clsx(
          'bg-gray-50 block w-full p-2.5 border  border-gray-300  text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500  focus-visible:border-blue-500 focus-visible:ring-blue-500',
          inputStyles,
        )}
        placeholder="John"
        required
      />
      {errorText && (
        <Typography variant={'regular'} className={'text-red-500'}>
          {errorText}
        </Typography>
      )}
    </div>
  );
};
export default forwardRef(BaseModalInput);
