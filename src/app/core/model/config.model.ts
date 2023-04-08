export type ConfigValue = string | number | boolean;

export interface IConfigItem {
  code: string;
  value: string | number | boolean;
}

export interface IConfig extends Array<IConfigItem> {
}
