import {ApiRequest, IApi} from 'core/model/api.model';

export interface ICheckUserData {
  email: string;
  password: string;
}

export interface IUserApi extends IApi {
  checkUser: ApiRequest<string, ICheckUserData>;
}