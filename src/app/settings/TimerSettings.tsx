'use client';

import { FC } from 'react';
import { Button } from '../(common)/Button';
import Input from '../(common)/Input';
import ToggleAutoStart from './ToggleAutoStart';
import useSettingsContext from '@/hooks/useSettingsContext';
import { useCallback, useState } from 'react';

interface TimerSettingsProps {}

const TimerSettings: FC<TimerSettingsProps> = ({}) => {
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
    <div className='flex flex-col w-full gap-4'>
      <h3 className='font-extrabold text-3xl w-full'>Timer</h3>
      <div className='flex justify-between w-full gap-4 flex-col xs:flex-row'>
        <div className='flex flex-1 gap-2 w-full items-center p-4 rounded  bg-gray-800 border-gray-700 border-2'>
          <p className='flex-1'>Session duration</p>
          <Input
            type='number'
            className='w-16 text-center'
            onChange={(e) => setSessionTimeInMinutes(e.target.value)}
            value={sessionTimeInMinutes}
          />
        </div>
        <div className='flex flex-1 gap-2 w-full items-center p-4 rounded border-gray-700 bg-gray-800 border-2'>
          <p className='flex-1'>Break duration</p>
          <Input
            className='w-16 text-center'
            type='number'
            onChange={(e) => setBreakTimeInMinutes(e.target.value)}
            value={breakTimeInMinutes}
          />
        </div>
      </div>
      <Button variant='primary' className='w-full' onClick={handleSave}>
        Save
      </Button>
      <ToggleAutoStart />
    </div>
  );
};

export default TimerSettings;
