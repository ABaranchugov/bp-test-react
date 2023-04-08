import {useConfig} from 'core/hooks/use-config';
import {ICheckUserData, IUserApi} from './user-api.model';
import {useApi} from 'core/hooks/use-api/use-api';
import {AxiosInstance} from 'axios';
import {useRef} from 'react';

export function userApi(): IUserApi {
  const userApiUrl: string | null = useConfig<string>('userApiUrl');
  const api: AxiosInstance = useApi();
  const userApi: IUserApi = useRef<IUserApi>({
    checkUser: (data: ICheckUserData) => {
      return api.post(userApiUrl!, data);
    }
  }).current;

  return userApi;
}