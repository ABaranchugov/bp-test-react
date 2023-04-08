import {IIconProps} from '../icon/icon.model';
import {IButtonProps, IButtonPropsIcons} from './button.model';
import {instanceOfI} from 'core/utils/instance-of-i.util';

export function getButtonIcons({icon}: IButtonProps): IButtonPropsIcons {
  if (instanceOfI<IIconProps>(icon, ['type'])) {
    return {before: icon};
  }

  return icon || {};
}