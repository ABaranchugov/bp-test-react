import {FC, MouseEventHandler, ReactElement, useEffect, useState} from 'react';
import {LoginRouter} from 'features/login/login-router/login.router';
import classes from './classes.module.less';
import {Location, useLocation, useNavigate} from 'react-router-dom';
import {AppRoutes} from '../../router/router.constants';
import {Icon} from 'core/components/icon/icon';
import {useAppGlobalState} from '../../app';
import {getCloseIcon} from 'features/login/login.utils';
import {IIconProps} from 'core/components/icon/icon.model';
import {GlobalState, State} from 'core/model/state.model';
import {NavigateFunction} from 'react-router/dist/lib/hooks';
import {IAppGlobalState} from '../../app.model';
import {LoginRoutes} from 'features/login/login-router/login-router.constants';

export const Login: FC = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const [isMobile]: GlobalState<IAppGlobalState, 'isMobile'> = useAppGlobalState('isMobile');
  const [closeIcon, setCloseIcon]: State<IIconProps | null> = useState<IIconProps | null>(getCloseIcon(isMobile));
  const {pathname}: Location = useLocation()
    const handleClose: MouseEventHandler<HTMLDivElement> = () => navigate(AppRoutes.Home);

  const handleCloseIconMouseEnter: Function = () =>
    setCloseIcon(getCloseIcon(isMobile, true));

  const handleCloseIconMouseLeave: Function = () =>
    setCloseIcon(getCloseIcon(isMobile));

  useEffect(() => {
    if (pathname.includes(LoginRoutes.Success)) {
      setCloseIcon(null);
    } else {
      setCloseIcon(getCloseIcon(isMobile))
    }
  }, [isMobile, pathname]);

  return <div className={classes.login}>
    <div className={classes.loginMask} onClick={handleClose}></div>
    <div className={classes.login__body}>
      {closeIcon && <div className={classes.login__close} onClick={handleClose}
           onMouseEnter={handleCloseIconMouseEnter}
           onMouseLeave={handleCloseIconMouseLeave}>
        <Icon {...closeIcon}></Icon>
      </div>}
      <LoginRouter></LoginRouter>
    </div>
  </div>
}
