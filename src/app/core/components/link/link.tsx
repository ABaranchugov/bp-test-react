import {FC, ReactElement} from 'react';
import {ILinkProps} from 'core/components/link/link.model';
import {useNavigate} from 'react-router-dom';
import classes from './classes.module.less'

export const Link: FC<ILinkProps> = ({children, label, url, target}: ILinkProps): ReactElement => {
  const navigate = useNavigate();

  const handleClick = () => {
    target === '_route'
      ? navigate(url)
      : window.open(url, target || '_blank')
  };

  return <a className={classes.link} onClick={handleClick}>
    {children && children || label}
  </a>
}