import {FieldType, IFieldValidator, IFieldValidators} from './field.model';
import {StyleClassesMap} from 'core/model/style.model';
import {IButtonProps} from '../button/button.model';
import classes from './classes.module.less'
import {IIconProps} from 'core/components/icon/icon.model';

export const EMAIL_REGEXP: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
export const PASSWORD_REGEXP: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const DEFAULT_REQUIRED_VALIDATOR: IFieldValidator<boolean> = {
  value: true,
  message: 'This field is required'
}

export const DEFAULT_VALIDATORS: Partial<Record<FieldType, IFieldValidators>> = {
  password: {
    required: {...DEFAULT_REQUIRED_VALIDATOR},
    pattern: {
      value: PASSWORD_REGEXP,
      message: 'Wrong password'
    }
  },
  email: {
    required: {...DEFAULT_REQUIRED_VALIDATOR},
    pattern: {
      value: EMAIL_REGEXP,
      message: 'Not valid E-mail address'
    }
  }
}

export const FIELD_EXCLAMATION_ICON: IIconProps = {
  type: 'exclamation-circle',
  size: 20
}

export const FIELD_CLASS_MAP: StyleClassesMap<IButtonProps> = {
  disable: {
    true: classes._disabled
  },
  error: {
    true: classes._invalid
  }
}