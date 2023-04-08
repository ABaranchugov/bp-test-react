import {IFormChangeEvent, IFormProps} from 'core/components/form/form.model';
import {FormEvent, FormEventHandler, useEffect, useState} from 'react';
import {equals} from 'core/utils/common.utils';
import {UseFormReturn} from 'react-hook-form';

export function useFormChange(
  form: UseFormReturn,
  onChangeCallback: IFormProps['onChange'],
  delay: number = 128
): FormEventHandler<HTMLFormElement> {
  const [formEvent, setFormEvent] = useState<FormEvent>();
  const [formChangeEvent, setFormChangeEvent] = useState<IFormChangeEvent>();
  const [timeoutChange, setTimeoutChange] = useState<any>();

  if (typeof onChangeCallback !== 'function') {
    return (_: FormEvent) => {
    };
  }

  useEffect(() => {
    if (formChangeEvent) {
      onChangeCallback(formChangeEvent);
    }
  }, [formChangeEvent]);

  useEffect(() => {
    if (typeof onChangeCallback !== 'function') {
      return;
    }

    clearTimeout(timeoutChange);

    setTimeoutChange(
      setTimeout(() => {
        const {getValues, setError, formState: {isValid, errors, isDirty}}: UseFormReturn = form;
        const newFormChangeEvent: IFormChangeEvent = {
          isValid,
          errors,
          setError,
          value: getValues()
        };

        if (!equals(newFormChangeEvent, formChangeEvent) && isDirty) {
          setFormChangeEvent(newFormChangeEvent);
        }
      }, delay)
    );
  }, [formEvent]);

  return setFormEvent;
}