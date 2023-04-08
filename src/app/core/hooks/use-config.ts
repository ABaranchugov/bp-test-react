import {ConfigValue} from 'core/model/config.model';
import {useAppGlobalState} from '../../app';

export function useConfig<T extends ConfigValue = string>(key: string): T | null;
export function useConfig<T extends Array<ConfigValue | null> = Array<string | null>>(key: string, ...keys: string[]): T;
export function useConfig(key: string, ...keys: string[]): any {
  const [config] = useAppGlobalState('config');

  if (!keys.length) {
    return config.find(({code}) =>
      code === key
    )?.value || null;
  }

  keys = [key, ...keys];

  return keys.map(key =>
    config.find(({code}) =>
      code === key
    )?.value || null
  );
}