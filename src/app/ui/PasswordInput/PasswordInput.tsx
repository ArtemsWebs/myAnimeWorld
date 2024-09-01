import {
  DetailedHTMLProps,
  FormEvent,
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useState,
} from 'react';
import { IconButton, Show } from '@/app/ui';
import { PiEyeSlash, PiEyeLight } from 'react-icons/pi';
import BaseModalInput from '@/app/ui/BaseModalInput/BaseModalInput';
import clsx from 'clsx';

interface PasswordInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  className?: string;
  errorText?: string;
}

const PasswordInput: ForwardRefRenderFunction<
  HTMLInputElement,
  PasswordInputProps
> = ({ disabled, className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={clsx('relative', className)}>
      <BaseModalInput
        {...props}
        inputStyles={'pr-7'}
        disabled={disabled}
        ref={ref}
        type={showPassword ? 'text' : 'password'}
      />
      <Show when={!showPassword}>
        <IconButton
          className="absolute top-[29px] left-[89%]"
          onClick={() => setShowPassword((prevState) => !prevState)}
        >
          <div
            className={
              'w-[24px] h-[24px] rounded-lg flex items-center justify-center'
            }
          >
            <PiEyeLight />
          </div>
        </IconButton>
      </Show>
      <Show when={showPassword}>
        <IconButton
          className="absolute top-[29px] left-[89%]"
          onClick={() => setShowPassword((prevState) => !prevState)}
        >
          <div
            className={
              'w-[24px] h-[24px] rounded-lg flex items-center justify-center'
            }
          >
            <PiEyeSlash />
          </div>
        </IconButton>
      </Show>
    </div>
  );
};

export default forwardRef(PasswordInput);
