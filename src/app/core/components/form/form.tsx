import {FC, ReactElement} from 'react';
import {useForm, UseFormReturn} from 'react-hook-form';
import {IFormProps} from './form.model';
import {FormItem} from './form-item/form-item';
import {Filed} from '../field/filed';
import {useFormChange} from 'core/components/form/form-change.hook';
import {ON_SUBMIT} from 'core/components/form/form.constants';

export const Form: FC<IFormProps> = ({children, fields, onChange, onSubmit}): ReactElement => {
  const form: UseFormReturn<Record<string, any>> = useForm<Record<string, any>>({mode: 'all'});
  const {handleSubmit, register, formState: {errors}}: UseFormReturn = form;

  return <form onSubmit={handleSubmit(onSubmit || ON_SUBMIT)}
               onChange={useFormChange(form, onChange)}>
    {
      Object
        .entries(fields)
        .map(([name, props]) =>
          <FormItem key={name}>
            <Filed key={name} {...props} error={errors[name]?.message} name={name} register={register}></Filed>
          </FormItem>
        )
    }
    {children && children}
  </form>;
}