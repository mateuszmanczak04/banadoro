'use client';

import { FC, FormEvent } from 'react';
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

  const handleSave = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setSessionTime(parseInt(sessionTimeInMinutes) * 60);
      setBreakTime(parseInt(breakTimeInMinutes) * 60);
      close();
    },
    [breakTimeInMinutes, sessionTimeInMinutes, setBreakTime, setSessionTime]
  );

  return (
    <div className='flex flex-col gap-4 w-full'>
      <h3 className='font-extrabold text-3xl w-full'>Timer</h3>
      <form
        className='flex flex-col w-full gap-4 bg-gray-800 p-4 rounded-md'
        onSubmit={handleSave}>
        <div className='flex justify-between w-full gap-4 flex-col xs:flex-row'>
          <div className='flex flex-1 gap-2 w-full items-center p-4 rounded border-gray-600 border-2'>
            <p className='flex-1'>Session duration</p>
            <Input
              type='number'
              className='w-16 text-center'
              onChange={(e) => {
                setSessionTimeInMinutes(e.target.value);
              }}
              value={sessionTimeInMinutes}
            />
          </div>
          <div className='flex flex-1 gap-2 w-full items-center p-4 rounded border-gray-600 border-2'>
            <p className='flex-1'>Break duration</p>
            <Input
              className='w-16 text-center bg-gray-700'
              type='number'
              onChange={(e) => {
                setBreakTimeInMinutes(e.target.value);
              }}
              value={breakTimeInMinutes}
            />
          </div>
        </div>
        <Button
          variant='primary'
          className='w-full'
          type='submit'
          disabled={
            parseInt(sessionTimeInMinutes) * 60 === sessionTime &&
            parseInt(breakTimeInMinutes) * 60 === breakTime
          }>
          {parseInt(sessionTimeInMinutes) * 60 === sessionTime &&
          parseInt(breakTimeInMinutes) * 60 === breakTime
            ? 'Nothing has changed'
            : 'Save'}
        </Button>
        <ToggleAutoStart />
      </form>
    </div>
  );
};

export default TimerSettings;
