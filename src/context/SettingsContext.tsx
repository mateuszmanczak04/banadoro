import { init } from 'next/dist/compiled/@vercel/og/satori';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';

interface SettingsContextProps {
  autoStart: boolean;
  setAutoStart: (autoStart: boolean | ((prev: any) => boolean)) => void;
  hasAccount: boolean;
  setHasAccount: (hasAccount: boolean | ((prev: any) => boolean)) => void;
  sessionTime: number;
  breakTime: number;
  setSessionTime: (time: number) => void;
  setBreakTime: (time: number) => void;
}

export const SettingsContext = createContext<SettingsContextProps>(
  {} as SettingsContextProps
);

export const SettingsContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [autoStart, setAutoStart] = useState<boolean>(false);
  const [hasAccount, setHasAccount] = useState<boolean>(false);
  const [sessionTime, setSessionTime] = useState<number>(25 * 60);
  const [breakTime, setBreakTime] = useState<number>(5 * 60);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('autoStart'))
        setAutoStart(localStorage.getItem('autoStart') === 'true');
      if (localStorage.getItem('hasAccount'))
        setHasAccount(localStorage.getItem('hasAccount') === 'true');
      if (localStorage.getItem('sessionTime'))
        setSessionTime(
          localStorage.getItem('sessionTime')
            ? parseInt(localStorage.getItem('sessionTime') as string)
            : 25 * 60
        );
      if (localStorage.getItem('breakTime'))
        setBreakTime(
          localStorage.getItem('breakTime')
            ? parseInt(localStorage.getItem('breakTime') as string)
            : 5 * 60
        );
    }
  }, []);

  const lsSetAutoStart = (
    autoStart: boolean | ((prev: boolean) => boolean)
  ) => {
    setAutoStart(autoStart);
    localStorage.setItem('autoStart', JSON.stringify(autoStart));
  };

  const lsSetHasAccount = (
    hasAccount: boolean | ((prev: boolean) => boolean)
  ) => {
    setHasAccount(hasAccount);
    localStorage.setItem('hasAccount', JSON.stringify(hasAccount));
  };

  const lsSetSessionTime = (sessionTime: number) => {
    setSessionTime(sessionTime);
    localStorage.setItem('sessionTime', JSON.stringify(sessionTime));
  };

  const lsSetBreakTime = (breakTime: number) => {
    setBreakTime(breakTime);
    localStorage.setItem('breakTime', JSON.stringify(breakTime));
  };

  return (
    <SettingsContext.Provider
      value={{
        autoStart,
        setAutoStart: lsSetAutoStart,
        hasAccount,
        setHasAccount: lsSetHasAccount,
        sessionTime,
        setSessionTime: lsSetSessionTime,
        breakTime,
        setBreakTime: lsSetBreakTime,
      }}>
      {children}
    </SettingsContext.Provider>
  );
};
