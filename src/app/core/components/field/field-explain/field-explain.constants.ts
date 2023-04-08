import {IFieldExplainProps} from './field-explain.model';
import {StyleClassesMap} from 'core/model/style.model';
import classes from './classes.module.less';

export const FIELD_EXPLAIN_PROPS: IFieldExplainProps = {
  type: 'default'
};

export const FIELD_EXPLAIN_CLASS_MAP: StyleClassesMap<IFieldExplainProps> = {
  type: {
    error: classes._error
  }
}