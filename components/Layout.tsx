'use client';

import '@/styles/globals.css';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from 'next-auth/react';
import TopBar from '@/components/TopBar';

const persistor = persistStore(store);

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SessionProvider>
          <TopBar />
          {children}
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
};

export default Layout;
