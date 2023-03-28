'use client';

import React, { useState } from 'react';
import TopBar from './TopBar';
import ClockFrame from './ClockFrame';
import SettingsModal from './SettingsModal';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const persistor = persistStore(store);

const App = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className='font-sans bg-white flex w-screen h-screen flex-col items-center justify-center'>
          <TopBar openSettings={() => setSettingsOpen(true)} />
          <ClockFrame />
          {settingsOpen && (
            <SettingsModal close={() => setSettingsOpen(false)} />
          )}
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
