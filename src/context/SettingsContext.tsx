import Loading from '@/app/loading';
import useLocalStorage from '@/hooks/useLocalStorage';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';

interface SettingsContextProps {
  autoStart: boolean;
  setAutoStart: (autoStart: boolean) => void;
  hasAccount: boolean;
  setHasAccount: (hasAccount: boolean) => void;
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
  const [autoStart, setAutoStart] = useLocalStorage<boolean>(
    'autoStart',
    false
  );
  const [hasAccount, setHasAccount] = useLocalStorage<boolean>(
    'hasAccount',
    false
  );
  const [sessionTime, setSessionTime] = useLocalStorage<number>(
    'sessionTime',
    25 * 60
  );
  const [breakTime, setBreakTime] = useLocalStorage<number>(
    'breakTime',
    5 * 60
  );

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        autoStart,
        setAutoStart,
        hasAccount,
        setHasAccount,
        sessionTime,
        setSessionTime,
        breakTime,
        setBreakTime,
      }}>
      {hasLoaded ? (
        children
      ) : (
        <div className='w-screen h-screen grid place-items-center'>
          <Loading />
        </div>
      )}
    </SettingsContext.Provider>
  );
};
