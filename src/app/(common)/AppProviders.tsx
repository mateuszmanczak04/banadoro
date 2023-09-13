'use client';

import { SettingsContextProvider } from '@/context/SettingsContext';
import { TimerContextProvider } from '@/context/TimerContext';
import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from '../../redux/store';

const persistor = persistStore(store);
interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SessionProvider>
          <SettingsContextProvider>
            <TimerContextProvider>{children}</TimerContextProvider>
          </SettingsContextProvider>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppProviders;
