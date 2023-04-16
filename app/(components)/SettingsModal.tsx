import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  getBreakTime,
  getSessionTime,
  setBreakTime as setStoreBreakTime,
  setSessionTime as setStoreSessionTime,
} from '../../redux/timer';
import ToggleDarkMode from './ToggleDarkMode';
import ToggleAutoStart from './ToggleAutoStart';

type Props = {
  close: () => void;
};

const SettingsModal = ({ close }: Props) => {
  // redux, global time in seconds
  const dispatch = useAppDispatch();
  const storeSessionTime = useAppSelector(getSessionTime);
  const storeBreakTime = useAppSelector(getBreakTime);

  // local time just for settings in minutes
  const [sessionTime, setSessionTime] = useState<string>(
    (storeSessionTime / 60).toString()
  );
  const [breakTime, setBreakTime] = useState<string>(
    (storeBreakTime / 60).toString()
  );

  const handleSave = useCallback(() => {
    dispatch(setStoreSessionTime(parseInt(sessionTime) * 60));
    dispatch(setStoreBreakTime(parseInt(breakTime) * 60));
    close();
  }, [breakTime, close, sessionTime, dispatch]);

  // escape detection
  useEffect(() => {
    const closeListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    window.addEventListener('keydown', closeListener);
    return () => window.removeEventListener('keydown', closeListener);
  }, [close]);

  // enter detection
  useEffect(() => {
    const closeListener = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSave();
      }
    };
    window.addEventListener('keydown', closeListener);
    return () => window.removeEventListener('keydown', closeListener);
  }, [handleSave]);

  return (
    <div className='fixed w-screen h-screen z-50 left-0 top-0'>
      {/* backdrop */}
      <div
        className='w-full h-full bg-black bg-opacity-70'
        onClick={close}></div>
      {/* content */}
      <div className='bg-primary-300 rounded absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-8 flex flex-col gap-4 items-center w-10/12 max-w-sm dark:bg-gray-900 max-h-screen overflow-y-scroll'>
        <div className='w-full flex justify-end'>
          <svg
            onClick={close}
            className='w-8 h-8 cursor-pointer'
            stroke='currentColor'
            strokeWidth='2.5'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'></path>
          </svg>
        </div>
        <h2 className='text-3xl font-bold'>Settings</h2>
        <div className='flex gap-2 w-full items-center p-4 rounded border-primary-500 bg-primary-200 dark:bg-gray-800 dark:border-gray-700 border-2'>
          <p className='flex-1'>Session duration</p>
          <input
            className='input-text flex-1'
            type='number'
            onChange={(e) => setSessionTime(e.target.value)}
            value={sessionTime}
          />
        </div>
        <div className='flex gap-2 w-full items-center p-4 rounded dark:border-gray-700 dark:bg-gray-800 border-2 border-primary-500 bg-primary-200'>
          <p className='flex-1'>Break duration</p>
          <input
            className='input-text flex-1'
            type='number'
            onChange={(e) => setBreakTime(e.target.value)}
            value={breakTime}
          />
        </div>
        <button className='btn' onClick={handleSave}>
          Save
        </button>
        <ToggleAutoStart />
        <ToggleDarkMode />
      </div>
    </div>
  );
};

export default SettingsModal;
