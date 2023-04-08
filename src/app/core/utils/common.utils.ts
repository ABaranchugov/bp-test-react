export function isEmpty<T = undefined | null>(value: any): value is T {
  return [undefined, null, ''].includes(value);
}

export function isNotEmpty<T extends any>(value: T | undefined | null): value is T {
  return !isEmpty(value);
}

export function equals(o1: any, o2: any): boolean {
  let key: any;
  let keySet: any;
  const t1: string = typeof o1;
  const t2: string = typeof o2;
  if (o1 === o2) {
    return true;
  }

  if (o1 === null || o2 === null) {
    return false;
  }

  if (o1 !== o1 && o2 !== o2) {
    return true;
  }

  if (o1 instanceof Date && o2 instanceof Date) {
    return o1.getTime() === o2.getTime();
  }

  if (t1 === t2 && t1 === 'object') {
    if (Array.isArray(o1)) {
      if (
        !Array.isArray(o2)
        || o1.length !== o2.length
      ) {
        return false;
      }

      for (key = 0; key < o1.length; key++) {
        if (!equals(o1[key], o2[key])) {
          return false;
        }
      }

      return true;
    } else {
      if (Array.isArray(o2)) {
        return false;
      }

      keySet = Object.create(null);

      for (key in o1) {
        if (!equals(o1[key], o2[key])) {
          return false;
        }
        keySet[key] = true;
      }

      for (key in o2) {
        if (!(key in keySet) && typeof o2[key] !== 'undefined') {
          return false;
        }
      }
      return true;
    }
  }
  return false;
}
