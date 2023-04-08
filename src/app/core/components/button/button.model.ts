import {IIconProps} from '../icon/icon.model';
import React, {PropsWithChildren} from 'react';

export type ButtonType = 'default' | 'primary' | 'danger' | 'success';
export type ButtonSize = 'small' | 'default' | 'large';

export interface IButtonPropsIcons {
  before?: IIconProps;
  after?: IIconProps;
}

export interface IButtonProps extends  Record<string, any>, PropsWithChildren {
  size?: ButtonSize,
  type?: ButtonType;
  label?: string;
  icon?: IIconProps | IButtonPropsIcons;
  attrs?: React.ComponentProps<'button'>;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  clickHandler?: (...args: any[]) => void;
}
