'use client';

import useSettingsContext from '@/hooks/useSettingsContext';
import { useCallback, useState } from 'react';
import { Button } from '../(common)/Button';
import ToggleAutoStart from './ToggleAutoStart';

const Settings = () => {
  const { sessionTime, breakTime, setSessionTime, setBreakTime } =
    useSettingsContext();

  const [sessionTimeInMinutes, setSessionTimeInMinutes] = useState<string>(
    (sessionTime / 60).toString()
  );
  const [breakTimeInMinutes, setBreakTimeInMinutes] = useState<string>(
    (breakTime / 60).toString()
  );

  const handleSave = useCallback(() => {
    setSessionTime(parseInt(sessionTimeInMinutes) * 60);
    setBreakTime(parseInt(breakTimeInMinutes) * 60);
    close();
  }, [breakTimeInMinutes, sessionTimeInMinutes, setBreakTime, setSessionTime]);

  return (
    <div className='flex flex-col items-center gap-4 w-full'>
      <div className='flex gap-2 w-full items-center p-4 rounded  bg-gray-800 border-gray-700 border-2'>
        <p className='flex-1'>Session duration</p>
        <input
          className='input-text flex-1'
          type='number'
          onChange={(e) => setSessionTimeInMinutes(e.target.value)}
          value={sessionTimeInMinutes}
        />
      </div>
      <div className='flex gap-2 w-full items-center p-4 rounded border-gray-700 bg-gray-800 border-2'>
        <p className='flex-1'>Break duration</p>
        <input
          className='input-text flex-1'
          type='number'
          onChange={(e) => setBreakTimeInMinutes(e.target.value)}
          value={breakTimeInMinutes}
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
