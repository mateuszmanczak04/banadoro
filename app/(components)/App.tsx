'use client';

import React, { useState } from 'react';
import TopBar from './TopBar';
import ClockFrame from './ClockFrame';
import SettingsModal from './SettingsModal';
import { Provider } from 'react-redux';
import store from '../../redux/store';

const App = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Provider store={store}>
      <div className='font-sans bg-white flex w-screen h-screen flex-col items-center justify-center'>
        <TopBar openSettings={() => setSettingsOpen(true)} />
        <ClockFrame />
        {settingsOpen && <SettingsModal close={() => setSettingsOpen(false)} />}
      </div>
    </Provider>
  );
};

export default App;
