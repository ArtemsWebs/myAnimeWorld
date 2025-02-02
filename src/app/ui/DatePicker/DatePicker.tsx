import clsx from 'clsx';

interface DatePickerProps {
  label: string;
  labelClassNames?: string;
  onChange: (value: string) => void;
  value: string;
}

const DatePicker = ({
  label,
  labelClassNames,
  onChange,
  value,
}: DatePickerProps) => {
  return (
    <div>
      <label
        htmlFor={'datePicker'}
        className={clsx(
          'block mb-2 text-sm font-medium text-gray-900',
          labelClassNames,
        )}
      >
        {label}
      </label>
      <input
        id="datePicker"
        type="date"
        onChange={(event) => onChange(event.target.value)}
        value={value}
        className={
          'min-w-[200px] min-h-[50px] rounded pl-1 pr-1 hover:cursor-pointer'
        }
      />
    </div>
  );
};

export default DatePicker;
