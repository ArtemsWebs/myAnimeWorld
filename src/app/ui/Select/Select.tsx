import Select, { GroupBase, Props } from 'react-select';
import classNames from 'classnames';

type CustomSelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Props<Option, IsMulti, Group> & {
  className?: string;
};

function CustomSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  isMulti,
  onChange,
  value,
  options,
  className,
  ...props
}: CustomSelectProps<Option, IsMulti, Group>) {
  return (
    <Select
      {...props}
      className={classNames(className, 'min-w-[200px]')}
      value={value}
      onChange={onChange}
      options={options}
    />
  );
}

export default CustomSelect;
