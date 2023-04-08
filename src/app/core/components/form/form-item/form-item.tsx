import {FC, PropsWithChildren, ReactElement} from 'react';
import classes from './classes.module.less'

export const FormItem: FC<PropsWithChildren> = ({children}: PropsWithChildren): ReactElement => {
  return <div className={classes.formItem}>{children}</div>
}