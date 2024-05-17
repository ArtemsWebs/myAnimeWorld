import { FormEvent } from 'react';

export interface BaseInputProps extends Partial<HTMLInputElement> {
  value?: string;
  label?: string;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
}
