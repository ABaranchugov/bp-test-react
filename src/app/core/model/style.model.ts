export type StyleProperties<T extends {} = {}> = Partial<T>;
export type StyleClassesMap<T extends {} = {}> = Partial<Record<keyof T, Record<string, string>>>;
