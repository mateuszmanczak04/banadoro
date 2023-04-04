import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  getBreakTime,
  getSessionTime,
  incrementUserTimeByAMinute,
} from '../../redux/timer';
import Counter from './Counter';
import { useSession } from 'next-auth/react';

const ClockFrame = () => {
  // redux
  const sessionTime = useAppSelector(getSessionTime);
  const breakTime = useAppSelector(getBreakTime);
  const dispatch = useAppDispatch();

  // state
  const [running, setRunning] = useState<boolean>(false);
  const [timePassed, setTimePassed] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<any>();
  const [mode, setMode] = useState<'session' | 'break'>('session');

  // session
  const { data: session } = useSession();

  const incrementTime = () => {
    setTimePassed((prev) => prev + 1);
  };

  // updating total time
  useEffect(() => {
    if (
      session &&
      session!.user!.email &&
      mode === 'session' &&
      timePassed > 0 &&
      timePassed % 60 == 0
    ) {
      dispatch(incrementUserTimeByAMinute());
    }
  }, [timePassed, dispatch, mode, session]);

  // run and pause
  const handleRun = () => {
    setRunning(true);
    const id = setInterval(() => {
      incrementTime();
    }, 1000);
    setIntervalId(id);
  };
  const handlePause = useCallback(() => {
    setRunning(false);
    clearInterval(intervalId);
  }, [intervalId]);

  // end session and break after exceeding time
  useEffect(() => {
    if (mode === 'session' && timePassed === sessionTime) {
      handlePause();
      setMode('break');
      setTimePassed(0);
      // TODO add finished interval to history and display notification
      return;
    } else if (mode === 'break' && timePassed === breakTime) {
      setTimePassed(0);
      handlePause();
      setMode('session');
      return;
    }
  }, [timePassed, handlePause, mode, sessionTime, breakTime]);

  // changing modes
  const handleSetModeSession = () => {
    if (mode === 'session') return;
    setMode('session');
    setTimePassed(0);
    handlePause();
  };
  const handleSetModeBreak = () => {
    if (mode === 'break') return;
    setMode('break');
    setTimePassed(0);
    handlePause();
  };

  return (
    <div className='w-full bg-gray-100 p-8 rounded-xl flex flex-col gap-8 items-center dark:bg-gray-800'>
      <div className='flex gap-4'>
        <button
          className={`bg-white py-2 px-6 rounded shadow cursor-pointer ${
            mode === 'session' && 'border-red-500 border-b-4'
          } dark:bg-gray-800 dark:hover:text-red-500`}
          onClick={handleSetModeSession}>
          Session
        </button>
        <button
          className={`bg-white py-2 px-6 rounded shadow cursor-pointe ${
            mode === 'break' && 'border-red-500 border-b-4'
          } dark:bg-gray-800 dark:hover:text-red-500`}
          onClick={handleSetModeBreak}>
          Break
        </button>
      </div>

      {mode === 'session' && (
        <Counter timeInSeconds={sessionTime - timePassed} />
      )}
      {mode === 'break' && <Counter timeInSeconds={breakTime - timePassed} />}

      {running ? (
        <>
          <button className='btn' onClick={handlePause}>
            Pause
          </button>
        </>
      ) : (
        <>
          <button className='btn' onClick={handleRun}>
            Start
          </button>
        </>
      )}
    </div>
  );
};

export default ClockFrame;
