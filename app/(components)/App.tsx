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
import RankingModal from './RankingModal';
import Description from './Description';

const App = () => {
  // redux
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initTheme());
    dispatch(fetchAllUserDays());
  }, [dispatch]);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [rankingOpen, setRankingOpen] = useState(false);

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
    <div className='font-sans flex flex-col gap-2'>
      <TopBar
        openRanking={() => setRankingOpen(true)}
        openSettings={() => setSettingsOpen(true)}
        openAccount={() => setAccountOpen(true)}
      />
      <div className='flex flex-col items-center md:items-start gap-8 mb-8 pt-20 md:flex-row w-screen max-w-10/12 p-8 justify-center h-screen'>
        <div className='w-full max-w-sm flex flex-col gap-8'>
          <ClockFrame />
          <AddTaskForm />
        </div>
        <div className='w-full max-w-sm'>
          <TaskList />
        </div>
      </div>
      <Description />
      {rankingOpen && <RankingModal close={() => setRankingOpen(false)} />}
      {settingsOpen && <SettingsModal close={() => setSettingsOpen(false)} />}
      {accountOpen && <AccountModal close={() => setAccountOpen(false)} />}
    </div>
  );
};

export default App;
