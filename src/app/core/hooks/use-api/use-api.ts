import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {useConfig} from 'core/hooks/use-config';
import {createGlobalState} from 'react-hooks-global-state';
import {IApiGlobalState} from 'core/hooks/use-api/use-api.model';
import {GlobalState} from 'core/model/state.model';

const {useGlobalState} = createGlobalState<IApiGlobalState>({instance: undefined});

export const useApi = (config?: AxiosRequestConfig): AxiosInstance => {
  let [api, setApi]: GlobalState<IApiGlobalState> = useGlobalState('instance');
  const baseURL: string | null = useConfig<string>('serverUrl');

  if (config) {
    return axios.create(config);
  }

  if (!api) {
    api = axios.create({
      timeout: 10000,
      baseURL: baseURL || '/'
    });

    setApi(() => api);
  }

  return api
}
