import {IButtonProps} from './button.model';
import {StyleClassesMap} from 'core/model/style.model';
import classes from './classes.module.less';

export const BUTTON_PROPS: IButtonProps = {
  size: 'default',
  type: 'primary',
  attrs: {}
};

export const BUTTON_CLASS_MAP: StyleClassesMap<IButtonProps> = {
  type: {
    default: classes._default,
    danger: classes._danger,
    primary: classes._primary,
    success: classes._success,
  },
  size: {
    large: classes._large,
    small: classes._small
  },
  block: {
    true: classes._block
  },
  disabled: {
    true: classes._disabled
  },
  loading: {
    true: classes._loading
  }
}


