import {LoginSuccess} from 'features/login/login-success/login-success';
import {LoginForm} from 'features/login/login-form/login-form';
import {PathRouteProps} from 'react-router/dist/lib/components';

export enum LoginRoutes {
  Form = '*',
  Success = '/success'
}

export const LOGIN_ROUTES: PathRouteProps[] = [
  {
    path: LoginRoutes.Form,
    Component: LoginForm
  },
  {
    path: LoginRoutes.Success,
    Component: LoginSuccess
  },
];