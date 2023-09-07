'use client';

import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  getBreakTime,
  getSessionTime,
  setBreakTime as setStoreBreakTime,
  setSessionTime as setStoreSessionTime,
} from '@/redux/timer';
import ToggleAutoStart from './ToggleAutoStart';
import { Button } from '../(common)/Button';

const Settings = () => {
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
  }, [breakTime, sessionTime, dispatch]);

  return (
    <div className='flex flex-col items-center gap-4 w-full'>
      <div className='flex gap-2 w-full items-center p-4 rounded  bg-gray-800 border-gray-700 border-2'>
        <p className='flex-1'>Session duration</p>
        <input
          className='input-text flex-1'
          type='number'
          onChange={(e) => setSessionTime(e.target.value)}
          value={sessionTime}
        />
      </div>
      <div className='flex gap-2 w-full items-center p-4 rounded border-gray-700 bg-gray-800 border-2'>
        <p className='flex-1'>Break duration</p>
        <input
          className='input-text flex-1'
          type='number'
          onChange={(e) => setBreakTime(e.target.value)}
          value={breakTime}
        />
      </div>
      <Button variant='primary' className='w-full' onClick={handleSave}>
        Save
      </Button>
      <ToggleAutoStart />
    </div>
  );
};

export default Settings;
