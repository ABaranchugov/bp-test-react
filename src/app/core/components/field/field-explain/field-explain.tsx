import {IFieldExplainProps} from './field-explain.model';
import {FC, ReactElement} from 'react';
import {FIELD_EXPLAIN_CLASS_MAP, FIELD_EXPLAIN_PROPS} from './field-explain.constants';
import classes from './classes.module.less';
import {getComponentClassName} from 'core/utils/styles.utils';

export const FieldExplain: FC<Partial<IFieldExplainProps>> = (props): ReactElement | null => {
  const {message}: IFieldExplainProps = {...FIELD_EXPLAIN_PROPS, ...props};

  return message
    ? <div className={getComponentClassName(FIELD_EXPLAIN_CLASS_MAP, props, classes.fieldExplain)}>
      {message}
    </div>
    : null
}