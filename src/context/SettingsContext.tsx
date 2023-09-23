import Loading from '@/app/loading';
import useLocalStorage from '@/hooks/useLocalStorage';
import axios from 'axios';
import { useSession } from 'next-auth/react';
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
  passwordHint: string;
  setPasswordHint: (hint: string) => void;
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
  const [passwordHint, setPasswordHint] = useState('');

  const [hasLoaded, setHasLoaded] = useState(false);
  const { data: session, status: sessionStatus } = useSession();

  /* if user is not logged in just set as loaded,
  if he is logged in, await fetching his password hint
  until displaying anything in the ui */
  useEffect(() => {
    const fetchPasswordHint = async () => {
      try {
        const res = await axios.get(
          '/api/auth/password-hint?email=' + session?.user?.email
        );
        console.log(res.data);
        setPasswordHint(res.data.hint);
      } catch {
      } finally {
        setHasLoaded(true);
      }
    };

    if (sessionStatus === 'loading') return;
    if (!session?.user?.email) {
      setHasLoaded(true);
      return;
    }
    fetchPasswordHint();
  }, [session?.user?.email, sessionStatus]);

  const handleSetPasswordHint = async (hint: string) => {
    try {
      await axios.put('/api/auth/password-hint', {
        hint,
      });
      setPasswordHint(hint);
    } catch {}
  };

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
        passwordHint,
        setPasswordHint: handleSetPasswordHint,
      }}>
      {hasLoaded && sessionStatus !== 'loading' ? (
        children
      ) : (
        <div className='w-screen h-screen grid place-items-center'>
          <Loading />
        </div>
      )}
    </SettingsContext.Provider>
  );
};
