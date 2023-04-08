import {StyleClassesMap, StyleProperties} from '../model/style.model';
import {isNotEmpty} from './common.utils';

export function getComponentClassName<T extends Record<string, any> = {}>(
  classMap: StyleClassesMap<T>,
  props: StyleProperties<T>,
  ...classes: (string | undefined)[]
): string {
  return Object
    .entries(props || {})
    .map(([propName, propValue]) => classMap[propName]?.[propValue])
    .concat(classes)
    .filter(isNotEmpty<string>)
    .join(' ');
}