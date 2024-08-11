import React, {
  FormEvent,
  ForwardRefRenderFunction,
  HTMLAttributes,
} from 'react';
import Typography from '@/app/ui/Typography';

interface BaseModalInputProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  errorText?: string;
}

const BaseModalInput: ForwardRefRenderFunction<
  HTMLInputElement,
  BaseModalInputProps
> = ({ label, onChange, errorText, ...props }, ref) => {
  return (
    <div>
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <input
        ref={ref}
        {...props}
        onChange={onChange}
        type="text"
        id="first_name"
        className="bg-gray-50 block w-full p-2.5 border  border-gray-300  text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500  focus-visible:border-blue-500 focus-visible:ring-blue-500"
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
export default React.forwardRef(BaseModalInput);
