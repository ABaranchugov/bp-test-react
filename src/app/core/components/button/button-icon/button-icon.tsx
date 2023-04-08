import {FC, ReactElement} from 'react';
import {IButtonIconProps} from 'core/components/button/button-icon/button-icon.model';
import {Icon} from 'core/components/icon/icon';
import {BUTTON_LOADING_ICON} from 'core/components/button/button-icon/button-icon.constants';

export const ButtonIcon: FC<IButtonIconProps> = ({className, icon, loading} ): ReactElement => {
  if (icon || loading) {
    return  <span className={className}>
      <Icon {...loading ? BUTTON_LOADING_ICON : icon!}></Icon>
    </span>
  }

  return <></>;
}