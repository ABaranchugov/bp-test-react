import {IFieldProps} from '../field/field.model';
import {PropsWithChildren} from 'react';
import {FieldErrors} from 'react-hook-form/dist/types/errors';
import {UseFormSetError} from 'react-hook-form/dist/types/form';

export type FormOnChange = (event: IFormChangeEvent) => any;
export type FormOnSubmit = (value: Record<string, any>) => any;

export interface IFormProps extends PropsWithChildren {
  fields: Record<string, IFieldProps>;
  onSubmit?: FormOnSubmit;
  onChange?: FormOnChange;
}

export interface IFormChangeEvent<T extends Record<string, any> = any> {
  value: T;
  isValid: boolean;
  errors?: FieldErrors;
  setError: UseFormSetError<any>
}
