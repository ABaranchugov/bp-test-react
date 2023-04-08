import {FC, ReactElement} from 'react';
import {Route, Routes} from 'react-router-dom';
import {LOGIN_ROUTES} from 'features/login/login-router/login-router.constants';

export const LoginRouter: FC = (): ReactElement => {
  return <Routes>
    {LOGIN_ROUTES.map((route, index) =>
      <Route key={index} {...route}></Route>
    )}
  </Routes>
}