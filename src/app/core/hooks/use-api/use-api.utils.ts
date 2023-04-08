import {useCallback, useState} from 'react';
import {MountedLoaders} from 'core/hooks/use-api/use-api.model';
import {State} from 'core/model/state.model';
import {IApi} from 'core/model/api.model';
import {AxiosPromise, AxiosRequestConfig} from 'axios';

export function mountLoader<T extends IApi = IApi>(api: T, name?: keyof T): boolean {
  const [loaders, setLoaders]: State<MountedLoaders<T>> = useState({});
  const updateLoader: (key: keyof T, loader?: boolean) => void = useCallback<(key: keyof T, loader?: boolean) => void>(
    (key: keyof T, loader: boolean = true): void => {
      setLoaders({...loaders, [key]: loader});
    },
    []
  );

  if (!Object.keys(loaders).length) {
    const newLoaders: MountedLoaders<T> = {};

    Object
      .keys(api)
      .filter((key) => !name || key === name)
      .forEach((key: keyof T) => {
        const request: typeof api[typeof key] = api[key];
        newLoaders[key as any] = false;
        api[key] = ((data: any, config?: AxiosRequestConfig): AxiosPromise => {
          updateLoader(key)

          return request(data, config).finally(() =>
            updateLoader(key, false)
          );
        }) as typeof request;

        setLoaders(newLoaders);
      });
  }

  return Object.values(loaders).some(loader => loader);
}
