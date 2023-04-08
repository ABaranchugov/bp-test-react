import {FC, ReactElement} from 'react';
import {Icon} from 'core/components/icon/icon';
import classes from './classes.module.less';
import {Button} from 'core/components/button/button';
import {useNavigate} from 'react-router-dom';
import {NavigateFunction} from 'react-router/dist/lib/hooks';

export const NotFound: FC = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const goToHome: () => void = () => navigate('/');

  return <div className={classes.notFound}>
    <Icon type={'notfound'} viewBox={'0 0 820 469'} size={480}></Icon>
    <div className={classes.notFound__content}>
      <h1 className={classes.notFound__title}>404</h1>
      <h2 className={classes.notFound__subTitle}>Page not found</h2>
      <p className={classes.notFound__message}>The page you are looking for does not exist. You can click the button
        below to go back to the homepage.</p>
      <Button type={'primary'} clickHandler={goToHome}>Go to home</Button>
    </div>
  </div>
}
