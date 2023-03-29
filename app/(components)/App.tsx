'use client';

import React, { useState } from 'react';
import TopBar from './TopBar';
import ClockFrame from './ClockFrame';
import SettingsModal from './SettingsModal';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AccountModal from './AccountModal';
import { SessionProvider } from 'next-auth/react';
import TaskList from './TaskList';
import { AddTaskForm } from './AddTaskForm';

const persistor = persistStore(store);

const App = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SessionProvider>
          <div className='font-sans bg-white flex flex-col items-center md:items-start gap-8 mb-8 pt-20 md:flex-row w-screen max-w-10/12 p-8 justify-center'>
            <TopBar
              openSettings={() => setSettingsOpen(true)}
              openAccount={() => setAccountOpen(true)}
            />
            <div className='w-full max-w-sm flex flex-col gap-8'>
              <ClockFrame />
              <AddTaskForm />
            </div>
            <div className='w-full max-w-sm'>
              <TaskList />
            </div>
            {settingsOpen && (
              <SettingsModal close={() => setSettingsOpen(false)} />
            )}
            {accountOpen && (
              <AccountModal close={() => setAccountOpen(false)} />
            )}
          </div>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
