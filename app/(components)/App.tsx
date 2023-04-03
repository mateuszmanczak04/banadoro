'use client';

import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import ClockFrame from './ClockFrame';
import SettingsModal from './SettingsModal';
import { useAppDispatch } from '../../redux/store';
import AccountModal from './AccountModal';
import TaskList from './TaskList';
import { AddTaskForm } from './AddTaskForm';
import { initTheme } from '../../redux/theme';
import { fetchAllUserDays } from '../../redux/timer';

const App = () => {
  // redux
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initTheme());
    dispatch(fetchAllUserDays());
  }, [dispatch]);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  // tab detection - open account
  useEffect(() => {
    const closeListener = (e: KeyboardEvent) => {
      if (!e.shiftKey && e.key === 'Tab' && !settingsOpen) {
        setAccountOpen(true);
      }
    };
    window.addEventListener('keydown', closeListener);
    return () => window.removeEventListener('keydown', closeListener);
  }, [settingsOpen]);

  // escape detection - open settings
  useEffect(() => {
    const closeListener = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'Tab' && !accountOpen) {
        setSettingsOpen(true);
      }
    };
    window.addEventListener('keydown', closeListener);
    return () => window.removeEventListener('keydown', closeListener);
  }, [accountOpen]);

  return (
    <div className='font-sans flex flex-col items-center md:items-start gap-8 mb-8 pt-20 md:flex-row w-screen max-w-10/12 p-8 justify-center'>
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
      {settingsOpen && <SettingsModal close={() => setSettingsOpen(false)} />}
      {accountOpen && <AccountModal close={() => setAccountOpen(false)} />}
    </div>
  );
};

export default App;
