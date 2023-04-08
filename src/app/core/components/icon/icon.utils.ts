import {ICON_SIZE, SVG_TAG_REGEXP} from './icon.constants';
import {IIconProps} from './icon.model';
import {CSSProperties, Dispatch, SetStateAction} from 'react';

export function getIconSize(size?: string | number): string {
  const sizeNum: number = parseInt(String(size));

  if (sizeNum && typeof size === 'string' && size.endsWith('px')) {
    return size;
  } else if (!sizeNum) {
    return ICON_SIZE;
  }

  return `${sizeNum}px`;
}

export function getIconStyle({size, color}: Partial<IIconProps>): CSSProperties{
  const style: CSSProperties = {fontSize: getIconSize(size)};

  if (color) {
    style.color = color;
  }

  return style;
}

export function clearIconSvg(svg: string): string {
  return svg.replace(SVG_TAG_REGEXP, '');
}

export function importIcon (type: string, setIcon: Dispatch<SetStateAction<string>>): void {
  if (!type || !setIcon) {
    return
  }

  import(`./../../../../assets/icons/${type}.svg`).then(icon => {
    setIcon(icon.default)
  });
}