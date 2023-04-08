import {FC, ReactElement} from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import {ROUTES} from './router.constants';

const router = createBrowserRouter(
  createRoutesFromElements(
    ROUTES.map((route, index) =>
      <Route key={index} {...route}></Route>
    )
  )
);

export const Router: FC = (): ReactElement => {
  return <RouterProvider router={router}></RouterProvider>
}