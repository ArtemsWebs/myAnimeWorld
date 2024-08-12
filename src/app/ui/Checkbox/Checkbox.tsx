import Typography from '@/app/ui/Typography';
import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react';
import classes from './Checkbox.module.scss';

interface CheckboxProps
  extends Omit<
    React.DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'onChange'
  > {
  label: string;
  onChange: (value: boolean) => void;
}

const Checkbox: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = ({
  label,
  onChange,
  ...props
}: CheckboxProps) => {
  return (
    <div className={classes['checkbox-container']}>
      <input
        {...props}
        name="defaultRoleCheckbox"
        id="defaultRoleCheckbox"
        type="checkbox"
        onClick={() => {}}
        onChange={(e) => {
          onChange(!props.checked);
        }}
      />
      <label htmlFor="defaultRoleCheckbox">
        <Typography variant={'regular'}>{label}</Typography>
      </label>
    </div>
  );
};

export default React.forwardRef(Checkbox);
