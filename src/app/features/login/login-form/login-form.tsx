import {FC, ReactElement, useEffect, useState} from 'react';
import {Form} from 'core/components/form/form';
import {
  AttemptsKey,
  FORM_INITIAL_STATE,
  LOGIN_BUTTON,
  LOGIN_FORM,
  USER_ICON
} from 'features/login/login-form/login-form.constants';
import classes from './classes.module.less';
import {Icon} from 'core/components/icon/icon';
import {getDirtySetter, getUserIconSize} from 'features/login/login-form/login-form.utils';
import {useAppGlobalState} from '../../../app';
import {Button} from 'core/components/button/button';
import {IFormChangeEvent} from 'core/components/form/form.model';
import {ICheckUserData, IUserApi} from '../../../shared/api/user-api/user-api.model';
import {userApi} from '../../../shared/api/user-api/user.api';
import {mountLoader} from 'core/hooks/use-api/use-api.utils';
import {Link} from 'core/components/link/link';
import {FormItem} from 'core/components/form/form-item/form-item';
import {unstable_usePrompt as usePrompt, useNavigate} from 'react-router-dom';
import {LoginRoutes} from 'features/login/login-router/login-router.constants';
import {AppRoutes} from '../../../router/router.constants';
import {AxiosError} from 'axios';
import {NavigateFunction} from 'react-router/dist/lib/hooks';
import {GlobalState, State} from 'core/model/state.model';
import {IAppGlobalState} from '../../../app.model';
import {useLocalStorage} from 'core/hooks/use-localstorage';

export const LoginForm: FC = (): ReactElement => {
  const api: IUserApi = userApi();
  const navigate: NavigateFunction = useNavigate();
  const [{
    isValid,
    value,
    setError
  }, formChange]: State<IFormChangeEvent<ICheckUserData>> = useState<IFormChangeEvent<ICheckUserData>>(FORM_INITIAL_STATE);
  const checkUserLoading: boolean = mountLoader<IUserApi>(api);
  const [isMobile]: GlobalState<IAppGlobalState> = useAppGlobalState('isMobile');
  const isDirtyState: State<boolean> = useState<boolean>(false);
  const setIsDirty: (value: Record<string, any>) => void = getDirtySetter(isDirtyState);
  const [successAttempts, setSuccessAttempts] = useLocalStorage(AttemptsKey.success, 0);
  const [failedAttempts, setFailedAttempts] = useLocalStorage(AttemptsKey.failed, 0);

  const handleChange: Function = (event: IFormChangeEvent) => formChange(event);

  const handleSubmit: Function = () => {
    api.checkUser(value).then(
      () => {
        isDirtyState[1](false);
        setSuccessAttempts(successAttempts + 1);
        setTimeout(() => navigate(`${AppRoutes.Login}${LoginRoutes.Success}`));
      },
      ({response}: AxiosError) => {
        setFailedAttempts(failedAttempts + 1);
        setError('password', {message: String(response?.data || 'Something wrong')});
      }
    )
  }

  useEffect(() => setIsDirty(value), [value]);
  usePrompt({when: isDirtyState[0], message: 'Are you sure you want to leave?'});

  return <div className={classes.loginForm}>
    <div className={classes.loginForm__left}>
      <Icon {...USER_ICON} size={getUserIconSize(isMobile)}></Icon>
    </div>

    <div className={classes.loginForm__right}>
      <Form {...LOGIN_FORM}
            onChange={handleChange}
            onSubmit={handleSubmit}>
        <FormItem>
          <Button {...LOGIN_BUTTON}
                  loading={checkUserLoading}
                  disabled={!isValid}>
          </Button>
        </FormItem>
      </Form>
      <div className={classes.loginForm__rightFooter}>
        <Link url={'/forgot'} label={'Forgot password?'}></Link>
        <Icon type={'oval'} size={4} color={'#5988D9'}></Icon>
        <Link url={'/register'} label={'User registration?'}></Link>
      </div>
    </div>
  </div>;
}
