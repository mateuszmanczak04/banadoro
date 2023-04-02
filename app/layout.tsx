'use client';

import React, { ReactNode } from 'react';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store, { useAppDispatch } from '../redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from 'next-auth/react';

const persistor = persistStore(store);

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en'>
      <head>
        <title>Pomodoro Timer</title>
      </head>
      <body className='bg-white dark:bg-gray-900 text-gray-800 dark:text-white'>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <SessionProvider>{children}</SessionProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
