export type FieldExplainType = 'default' | 'error';

export interface IFieldExplainProps {
  type: FieldExplainType;
  message?: string;
}