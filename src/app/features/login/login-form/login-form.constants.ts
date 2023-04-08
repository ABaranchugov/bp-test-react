import {IFormChangeEvent, IFormProps} from 'core/components/form/form.model';
import {IButtonProps} from 'core/components/button/button.model';
import {IIconProps} from 'core/components/icon/icon.model';
import {ICheckUserData} from '../../../shared/api/user-api/user-api.model';

export enum AttemptsKey {
  failed = 'failedAttempts',
  success = 'successAttempts',
}

export const LOGIN_FORM: IFormProps = {
  fields: {
    email: {
      label: 'Email',
      type: 'email'
    },
    password: {
      label: 'Password',
      type: 'password',
    }
  }
};

export const LOGIN_BUTTON: IButtonProps = {
  label: 'Login',
  type: 'primary',
  block: true,
  attrs: {
    type: 'submit'
  }
}

export const USER_ICON: IIconProps = {
  type: 'user',
  color: '#fff'
}

export const FORM_INITIAL_STATE: IFormChangeEvent<ICheckUserData> = {
  value: {
    email: '',
    password: ''
  },
  isValid: false,
  setError: () => {}
}