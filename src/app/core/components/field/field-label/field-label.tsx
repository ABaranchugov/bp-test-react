import {FC, ReactElement} from 'react';
import classes from './classes.module.less';

export const FieldLabel: FC<{label: string}> = ({label}): ReactElement | null => {
  return label
    ? <label className={classes.fieldLabel}>{label}</label>
    : null
}