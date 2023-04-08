import {IIconProps} from 'core/components/icon/icon.model';
import {CLOSE_ICON, CLOSE_ICON_HOVER_COLOR, CLOSE_ICON_WHITE_COLOR} from 'features/login/login.constants';

export function getCloseIcon(isMobile: boolean, onHover: boolean = false): IIconProps {
  const icon: IIconProps = {...CLOSE_ICON};

  if (isMobile) {
    icon.color = CLOSE_ICON_WHITE_COLOR;
  } else if(onHover) {
    icon.color = CLOSE_ICON_HOVER_COLOR;
  }

  return icon
}