import {useCallback, useRef} from 'react';
import {isNotEmpty} from 'core/utils/common.utils';
import {debounce} from 'throttle-debounce';
import {State} from 'core/model/state.model';
import {useLocalStorage} from 'core/hooks/use-local-storage';
import {AttemptsKey} from 'features/login/login-form/login-form.constants';

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

export function useIncreaseAttempts(): (success: boolean) => void {
  const [successAttempts, setSuccessAttempts] = useLocalStorage(AttemptsKey.success, 0);
  const [failedAttempts, setFailedAttempts] = useLocalStorage(AttemptsKey.failed, 0);
  const increaseAttempts: (success: boolean) => void = useCallback(
    (success: boolean): void => success
      ? setSuccessAttempts(successAttempts + 1)
      : setFailedAttempts(failedAttempts + 1),
    []
  );

  return increaseAttempts
}
