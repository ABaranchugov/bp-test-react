import {AxiosInstance, AxiosPromise} from 'axios';
import {IApi} from 'core/model/api.model';

export type AxiosPromiseFn = (...args: any[]) => AxiosPromise;
export type MountedLoaders<T extends IApi> = Partial<Record<keyof T, boolean>>;

export interface IApiGlobalState {
  instance?: AxiosInstance
}
