import {IIconProps} from './icon.model';
import {StyleClassesMap} from 'core/model/style.model';
import classes from './classes.module.less';

export const ICON_SIZE: string = 'inherit';
export const ICON_VIEW_BOX: string = '0 0 24 24';
export const SVG_TAG_REGEXP: RegExp = /<[\/]?svg[^<>]*>/g;

export const ICON_CLASS_MAP: StyleClassesMap<IIconProps> = {
  type: {
    loading: classes._spin
  }
}
