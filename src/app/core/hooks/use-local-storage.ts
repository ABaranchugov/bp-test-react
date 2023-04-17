import {useState} from 'react';

export function useLocalStorage<T = string>(key: string, initialValue: any = null): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    if (!localStorage) {
      return initialValue;
    }
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);

      if (localStorage) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}