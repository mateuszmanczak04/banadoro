import React, { useEffect } from 'react';
import { useAppDispatch } from '../../redux/store';
import { initTheme } from '../../redux/theme';

type Props = {
  openSettings: () => void;
  openAccount: () => void;
};

const TopBar = ({ openSettings, openAccount }: Props) => {
  // redux
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initTheme());
  }, [dispatch]);

  return (
    <div className='fixed top-0 flex justify-between w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-gray-200'>
      <h1 className='text-2xl font-extrabold'>Pomodoro</h1>
      <div className='flex gap-6'>
        <button onClick={openAccount}>Account</button>
        <button onClick={openSettings}>Settings</button>
      </div>
    </div>
  );
};

export default TopBar;
