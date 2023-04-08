import {FC, ReactElement, useEffect} from 'react';
import classes from './classes.module.less';
import {Icon} from 'core/components/icon/icon';
import {NavigateFunction} from 'react-router/dist/lib/hooks';
import {useNavigate} from 'react-router-dom';
import {AppRoutes} from '../../../router/router.constants';

export const LoginSuccess: FC<any> = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate(AppRoutes.Home), 3000)
  }, []);

  return <div className={classes.loginSuccess}>
    <Icon type={'success-circle'} size={168} color={'white'}></Icon>
    <h1 className={classes.loginSuccess__title}>Success!</h1>
  </div>;
}