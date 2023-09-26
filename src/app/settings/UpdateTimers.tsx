'use client';

import useTimerSettingsContext from '@/hooks/useTimerSettingsContext';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FormEvent, useCallback, useState } from 'react';
import { Button } from '../(common)/Button';
import Input from '../(common)/Input';
import Loading from '../loading';

const UpdateTimers = ({}) => {
  const { sessionTime, breakTime, setSessionTime, setBreakTime } =
    useTimerSettingsContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { data: session } = useSession();

  const [sessionTimeInMinutes, setSessionTimeInMinutes] = useState<string>(
    (sessionTime / 60).toString()
  );
  const [breakTimeInMinutes, setBreakTimeInMinutes] = useState<string>(
    (breakTime / 60).toString()
  );

  const handleSave = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      // user not signed in
      if (!session) {
        setSessionTime(parseInt(sessionTimeInMinutes) * 60);
        setBreakTime(parseInt(breakTimeInMinutes) * 60);
        return;
      }

      // user signed in
      setLoading(true);
      setError('');
      try {
        await axios.put('/api/settings/timer/timers', {
          sessionTime: parseInt(sessionTimeInMinutes) * 60,
          breakTime: parseInt(breakTimeInMinutes) * 60,
        });
        setSessionTime(parseInt(sessionTimeInMinutes) * 60);
        setBreakTime(parseInt(breakTimeInMinutes) * 60);
      } catch (error: any) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }

      close();
    },
    [breakTimeInMinutes, sessionTimeInMinutes, setBreakTime, setSessionTime]
  );

  return (
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
        Update
      </Button>
      {loading && <Loading />}
      {error && <p className='text-red-500'>{error}</p>}
    </form>
  );
};

export default UpdateTimers;
