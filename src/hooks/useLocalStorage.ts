'use client';

import { useCallback, useState } from 'react';

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [state, setState] = useState(() => {
    // Initialize the state
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch {}
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
      } catch {}
    },
    [key]
  );

  return [state, setValue];
};

export default useLocalStorage;
