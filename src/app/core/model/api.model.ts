import {AxiosPromise, AxiosRequestConfig} from "axios";

export type ApiRequest<T = any, D = any> = (data: D, config?: AxiosRequestConfig) => AxiosPromise;

export interface IApi {
  [key: string]: ApiRequest;
}