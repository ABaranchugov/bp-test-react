import {useRef} from 'react';
import {isNotEmpty} from 'core/utils/common.utils';
import {debounce} from 'throttle-debounce';
import {State} from 'core/model/state.model';

export function getUserIconSize(isMobile: boolean): number {
  return isMobile ? 140 : 196;
}

export function getDirtySetter([isDirty, setIsDirty]: State<boolean>): (value: {}) => void {
  return useRef<(value: {}) => void>(
    debounce(
      64,
      (value: {}) => {
        const isNotEmptyValue: boolean = Object.values(value).some(isNotEmpty);

        if (isNotEmptyValue && !isDirty) {
          setIsDirty(true);
        } else if (!isNotEmptyValue && isDirty) {
          setIsDirty(false);
        }
      })
  ).current;
}
