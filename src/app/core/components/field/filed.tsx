import {FC, ReactElement} from 'react';

import classes from './classes.module.less'
import {IFieldFormProps, IFieldProps} from './field.model';
import {FieldLabel} from './field-label/field-label';
import {FieldExplain} from './field-explain/field-explain';
import {getFieldValidators} from './field.utils';
import {getComponentClassName} from 'core/utils/styles.utils';
import {FIELD_CLASS_MAP, FIELD_EXCLAMATION_ICON} from './field.constants';
import {Icon} from 'core/components/icon/icon';

export const Filed: FC<IFieldProps & IFieldFormProps> = (props: IFieldProps & IFieldFormProps): ReactElement => {
  const {register, error, name, validators, label, type, attrs}: IFieldProps & IFieldFormProps = props;
  const className: string = getComponentClassName(FIELD_CLASS_MAP, {
    disabled: attrs?.disabled,
    error: !!error
  }, classes.field__input);

  return <div className={classes.field}>
    {label && <FieldLabel label={label}></FieldLabel>}
    <div className={classes.field__inputWrapper}>
      <input
        className={className}
        {...register(name, getFieldValidators(type, validators))}
        {...{...attrs, type}}
        aria-invalid={error ? "true" : "false"}
      />
      {error && <span className={classes.field__exclamation}>
        <Icon {...FIELD_EXCLAMATION_ICON}></Icon>
      </span>}
    </div>

    {error && <FieldExplain type={'error'} message={error}></FieldExplain>}
  </div>
}
