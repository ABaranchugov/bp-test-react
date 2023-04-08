import {Login} from 'features/login/login';
import {Home} from 'features/home/home';
import {PathRouteProps} from 'react-router/dist/lib/components';
import {NotFound} from 'features/not-found/not-found';

export enum AppRoutes {
  Home = '/',
  Login = '/login',
  NotFound = '*'
}

export const ROUTES: PathRouteProps[] = [
  {
    path: AppRoutes.Home,
    Component: Home
  },
  {
    path: `${AppRoutes.Login}/*`,
    Component: Login
  },
  {
    path: AppRoutes.NotFound,
    Component: NotFound
  }
];