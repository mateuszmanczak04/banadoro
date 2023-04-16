'use client';

import React, { ReactNode } from 'react';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from 'next-auth/react';

const persistor = persistStore(store);

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en'>
      <head>
        <title>Banadoro 🍌 - Pomodoro Timer</title>
        <meta
          name='description'
          content='Turn on timer for studying, create tasks, compete with others!'></meta>
      </head>
      <body className='bg-primary-200 dark:bg-gray-900 text-primary-900 dark:text-white'>
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
