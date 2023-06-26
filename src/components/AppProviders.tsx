'use client';

import { FC } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from 'next-auth/react';

const persistor = persistStore(store);
interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SessionProvider>{children}</SessionProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppProviders;
