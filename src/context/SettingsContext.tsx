import { createContext, FC, ReactNode, useState } from 'react';

interface SettingsContextProps {
  autoStart: boolean;
  setAutoStart: (autoStart: boolean | ((prev: any) => boolean)) => void;
}

const initialValue: SettingsContextProps = {
  autoStart: false,
  setAutoStart: () => {},
};

export const SettingsContext =
  createContext<SettingsContextProps>(initialValue);

export const SettingsContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [autoStart, setAutoStart] = useState<boolean>(initialValue.autoStart);

  return (
    <SettingsContext.Provider value={{ autoStart, setAutoStart }}>
      {children}
    </SettingsContext.Provider>
  );
};
