'use client';
import { useState } from 'react';
import ToggleButtonItem from './ToggleButtonItem';
import { ToggleButtonOption } from './type';

interface ToggleButtonsProps {
  options: ToggleButtonOption[];
}

const ToggleButtons = ({ options }: ToggleButtonsProps) => {
  const [activeToggleButton, setActiveToggleButton] =
    useState<ToggleButtonOption | null>(null);
  return (
    <div className="flex justify-between gap-6">
      {options.map((option, index) => (
        <ToggleButtonItem
          {...option}
          key={`${option.label}_${index}`}
          active={activeToggleButton?.label === option.label}
          onClick={() => {
            option.onClick();
            setActiveToggleButton(option);
          }}
        />
      ))}
    </div>
  );
};

export default ToggleButtons;
