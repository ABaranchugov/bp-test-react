export function instanceOfI<T>(obj: any, props: Array<keyof T> | Partial<Record<keyof T, any>>, strict: boolean = false): obj is T {
  const comparisonMethod: keyof Array<any> = strict ? 'every' : 'some';

  if (Array.isArray(props)) {
    return props[comparisonMethod](key =>
      typeof obj?.[key] !== undefined
    );
  }

  return Object.entries(props)
    [comparisonMethod](([key, value]) =>
    obj?.[key] === value
  );
}