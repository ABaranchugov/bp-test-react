import {ComponentProps} from 'react';
import {
  RegisterOptions as IFieldValidators,
  ValidationRule as IFieldValidator
} from 'react-hook-form/dist/types/validator';
import {UseFormRegister} from 'react-hook-form/dist/types/form';

export type FieldType = 'text' | 'email' | 'password';

export interface IFieldProps {
  label: string;
  type: FieldType;
  validators?: IFieldValidators;
  attrs?: ComponentProps<'input'>;
}

export interface IFieldFormProps {
  name: string;
  register: UseFormRegister<any>;
  error: any;
}

export {IFieldValidators, IFieldValidator};