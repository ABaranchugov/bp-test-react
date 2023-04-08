import {FC, ReactElement} from 'react';
import classes from './classes.module.less';
import {Button} from 'core/components/button/button';
import {LOGIN_BUTTON} from './home.constants';
import {useNavigate} from 'react-router-dom';
import {AppRoutes} from '../../router/router.constants';
import {NavigateFunction} from 'react-router/dist/lib/hooks';

export const Home: FC = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const login = () => navigate(AppRoutes.Login, {replace: true});

  return <div className={classes.home}>
    <Button {...LOGIN_BUTTON} clickHandler={login}></Button>
  </div>;
}
