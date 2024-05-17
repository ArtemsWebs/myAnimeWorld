import { BaseInputProps } from '@/app/ui/BaseInput/BaseInput.types';

const BaseInput = ({
  label,
  onChange,
  value,
  type,
  ...props
}: BaseInputProps) => {
  return (
    <div className="relative">
      <input
        {...props}
        id={type}
        onChange={onChange}
        value={value}
        type={type}
        placeholder=""
        className={`block
        w-full
        px-6
        pt-6
        pb-1
        rounded-md
        border-0
        focus:outline-none
        focus:ring-0
        bg-neutral-700
        text-white
        peer
        `}
      />
      <label
        className={`block
        absolute
        text-md
        duration-150
        font-medium
        leading-6
        text-zinc-400
        transform
        -translate-y-3
        scale-75
        top-4
        z-10
        origin-[0]
        left-6
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-3
        `}
        htmlFor={type}
      >
        {label}
      </label>
    </div>
  );
};

export default BaseInput;
