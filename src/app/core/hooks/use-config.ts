import {useContext} from 'react';
import {ConfigValue, IConfig} from 'core/model/config.model';
import {AppContext} from '../../../../App';
import {createGlobalState} from 'react-hooks-global-state';
import {USER_API_INITIAL_STATE} from 'core/hooks/use-api/user-api.constants';

const {useGlobalState} = createGlobalState({config: (process.env.config as unknown as IConfig) || []});

export function useConfig<T extends ConfigValue = string>(key: string): T | null;
export function useConfig<T extends Array<ConfigValue | null> = Array<string | null>>(key: string, ...keys: string[]): T;
export function useConfig(key: string, ...keys: string[]): any {
  let [config] = useGlobalState('config');

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