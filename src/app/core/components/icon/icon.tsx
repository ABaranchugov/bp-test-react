import {CSSProperties, FC, ReactElement, useEffect, useState} from "react";
import {ICON_CLASS_MAP, ICON_VIEW_BOX} from "./icon.constants";
import classes from './classes.module.less';
import {IIconProps} from './icon.model';
import {clearIconSvg, getIconStyle, importIcon} from './icon.utils';
import {getComponentClassName} from 'core/utils/styles.utils';
import {equals} from 'core/utils/common.utils';

export const Icon: FC<IIconProps> = ({viewBox, type, ...props}: IIconProps): ReactElement => {
  const [icon, setIcon] = useState<string>('');
  const [style, setStyle] = useState<CSSProperties>({});
  const newStyle: CSSProperties = getIconStyle(props);

  if (!equals(style, newStyle)) {
    setStyle(newStyle);
  }

  useEffect(() => {
      type && importIcon(type, setIcon)
    },
    [type]
  );

  return (<span className={getComponentClassName(ICON_CLASS_MAP, {type}, classes.icon, props.className)}
                data-title={JSON.stringify(style)}
                style={style}>
    {icon && <svg viewBox={viewBox || ICON_VIEW_BOX}
                  focusable="false"
                  fill="currentColor"
                  width="1em"
                  height="1em"
                  aria-hidden="true"
                  data-icon="forward"
                  dangerouslySetInnerHTML={{__html: clearIconSvg(icon)}}>
    </svg>}
  </span>);
}