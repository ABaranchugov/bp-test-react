import {FC, MouseEventHandler, ReactElement, useEffect, useState} from 'react';
import {LoginRouter} from 'features/login/login-router/login.router';
import classes from './classes.module.less';
import {Location, useLocation, useNavigate} from 'react-router-dom';
import {AppRoutes} from '../../router/router.constants';
import {Icon} from 'core/components/icon/icon';
import {IIconProps} from 'core/components/icon/icon.model';
import {State} from 'core/model/state.model';
import {NavigateFunction} from 'react-router/dist/lib/hooks';
import {LoginRoutes} from 'features/login/login-router/login-router.constants';
import {CLOSE_ICON} from 'features/login/login.constants';

export const Login: FC = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const [closeIcon, setCloseIcon]: State<IIconProps | null> = useState<IIconProps | null>(CLOSE_ICON);
  const {pathname}: Location = useLocation()
  const handleClose: MouseEventHandler<HTMLDivElement> = () => navigate(AppRoutes.Home);

  useEffect(() => {
    if (pathname.includes(LoginRoutes.Success)) {
      setCloseIcon(null);
    } else {
      setCloseIcon(CLOSE_ICON)
    }
  }, [pathname]);

  return <div className={classes.login}>
    <div className={classes.loginMask} onClick={handleClose}></div>
    <div className={classes.login__body}>
      {closeIcon && <div className={classes.login__close} onClick={handleClose}>
        <Icon {...closeIcon} className={classes.login__closeIcon} ></Icon>
      </div>}
      <LoginRouter></LoginRouter>
    </div>
  </div>
}
