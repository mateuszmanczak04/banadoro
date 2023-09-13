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

const initialState: SettingsContextProps = {
  autoStart: localStorage.getItem('autoStart') === 'true',
  setAutoStart: () => {},
  hasAccount: localStorage.getItem('hasAccount') === 'true' ? true : false,
  setHasAccount: () => {},
  sessionTime: localStorage.getItem('sessionTime')
    ? parseInt(localStorage.getItem('sessionTime') as string)
    : 25 * 60,
  breakTime: localStorage.getItem('breakTime')
    ? parseInt(localStorage.getItem('breakTime') as string)
    : 5 * 60,
  setSessionTime: () => {},
  setBreakTime: () => {},
};

export const SettingsContext =
  createContext<SettingsContextProps>(initialState);

export const SettingsContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [autoStart, setAutoStart] = useState<boolean>(initialState.autoStart);
  const [hasAccount, setHasAccount] = useState<boolean>(
    initialState.hasAccount
  );
  const [sessionTime, setSessionTime] = useState(initialState.sessionTime);
  const [breakTime, setBreakTime] = useState(initialState.breakTime);

  useEffect(() => {
    if (hasAccount)
      localStorage.setItem('hasAccount', JSON.stringify(hasAccount));
  }, [hasAccount]);

  useEffect(() => {
    localStorage.setItem('autoStart', JSON.stringify(autoStart));
  }, [autoStart]);

  useEffect(() => {
    localStorage.setItem('sessionTime', JSON.stringify(sessionTime));
  }, [sessionTime]);

  useEffect(() => {
    localStorage.setItem('breakTime', JSON.stringify(breakTime));
  }, [breakTime]);

  return (
    <SettingsContext.Provider
      value={{
        autoStart,
        setAutoStart,
        hasAccount,
        setHasAccount,
        sessionTime,
        breakTime,
        setSessionTime,
        setBreakTime,
      }}>
      {children}
    </SettingsContext.Provider>
  );
};
