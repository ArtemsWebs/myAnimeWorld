import Select, {
  GroupBase,
  Props,
  components,
  NoticeProps,
} from 'react-select';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import Typography from '@/app/ui/Typography';

type CustomSelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Props<Option, IsMulti, Group> & {
  className?: string;
  label?: string;
  labelClassNames?: string;
  ref?: any;
};

export const NoOptionsMessage = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: NoticeProps<Option, IsMulti, Group>,
) => {
  return (
    <components.NoOptionsMessage {...props}>
      <Typography variant={'subtitle'}>
        {'Упс, кажется вы выбрали все доступные опции'}
      </Typography>
    </components.NoOptionsMessage>
  );
};

const CustomSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  isMulti,
  onChange,
  value,
  options,
  label,
  className,
  labelClassNames,
  ref,
  ...props
}: CustomSelectProps<Option, IsMulti, Group>) => {
  return (
    <div>
      {label && (
        <label
          htmlFor="first_name"
          className={clsx(
            'block mb-2 text-sm font-medium text-gray-900',
            labelClassNames,
          )}
        >
          {label}
        </label>
      )}
      <Select
        ref={ref}
        {...props}
        options={options}
        isMulti={isMulti}
        className={clsx('min-w-[200px]', className)}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomSelect;
