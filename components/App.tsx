'use client';

import { useEffect, useState } from 'react';
import { fetchAllUserDays } from '@/redux/timer';
import TopBar from '@/components/TopBar';
import ClockFrame from '@/components/ClockFrame';
import SettingsModal from '@/components/SettingsModal';
import { useAppDispatch } from '@/redux/store';
import AccountModal from '@/components/AccountModal';
import TaskList from '@/components/TaskList';
import { AddTaskForm } from '@/components/AddTaskForm';
import { initTheme } from '@/redux/settings';
import RankingModal from '@/components/RankingModal';

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
      <div className='flex flex-col items-center md:items-start gap-8 mb-8 pt-20 md:flex-row w-screen max-w-10/12 p-8 justify-center min-h-screen'>
        <div className='w-full max-w-sm flex flex-col gap-8'>
          <ClockFrame />
          <AddTaskForm />
        </div>
        <div className='w-full max-w-sm'>
          <TaskList />
        </div>
      </div>
      {rankingOpen && <RankingModal close={() => setRankingOpen(false)} />}
      {settingsOpen && <SettingsModal close={() => setSettingsOpen(false)} />}
      {accountOpen && <AccountModal close={() => setAccountOpen(false)} />}
    </div>
  );
};

export default App;
