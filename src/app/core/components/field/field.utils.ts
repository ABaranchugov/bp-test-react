import {FieldType, IFieldValidators} from "./field.model";
import {DEFAULT_VALIDATORS} from './field.constants';

export function getFieldValidators(type: FieldType, validators?: IFieldValidators): IFieldValidators {
  const defaultValidators: IFieldValidators = DEFAULT_VALIDATORS[type] || {};

  if (!validators) {
    validators = {};
  }

  Object.entries(defaultValidators)
    .filter(([name]) => !(validators as any)[name])
    .forEach(([name, validator]) =>
      (validators as any)[name] = validator
    );

  return validators;
}