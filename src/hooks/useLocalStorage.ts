'use client';

import { useState } from 'react';

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

  const setValue = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    } catch {}
  };

  return [state, setValue];
};

export default useLocalStorage;
