import { createContext, FC, ReactNode, useEffect, useState } from 'react';

interface SettingsContextProps {
  autoStart: boolean;
  setAutoStart: (autoStart: boolean | ((prev: any) => boolean)) => void;
  hasAccount: boolean | null;
  setHasAccount: (hasAccount: boolean | ((prev: any) => boolean)) => void;
}

const initialValue: SettingsContextProps = {
  autoStart: false,
  setAutoStart: () => {},
  hasAccount: null,
  setHasAccount: () => {},
};

export const SettingsContext =
  createContext<SettingsContextProps>(initialValue);

export const SettingsContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [autoStart, setAutoStart] = useState<boolean>(initialValue.autoStart);
  const [hasAccount, setHasAccount] = useState<boolean | null>(
    initialValue.hasAccount
  );

  useEffect(() => {
    if (localStorage.getItem('hasAccount')) {
      setHasAccount(true);
    } else {
      setHasAccount(false);
    }
  }, []);

  const setAsSignedUp = () => {
    setHasAccount(true);
    localStorage.setItem('hasAccount', 'true');
  };

  return (
    <SettingsContext.Provider
      value={{
        autoStart,
        setAutoStart,
        hasAccount,
        setHasAccount: setAsSignedUp,
      }}>
      {children}
    </SettingsContext.Provider>
  );
};
