import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getBreakTime, getSessionTime } from '../../redux/timer';
import Counter from './Counter';

const ClockFrame = () => {
  // redux
  const sessionTime = useAppSelector(getSessionTime);
  const breakTime = useAppSelector(getBreakTime);

  // states
  const [running, setRunning] = useState<boolean>(false);
  const [timePassed, setTimePassed] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<any>();
  const [mode, setMode] = useState<'session' | 'break'>('session');

  // running

  const incrementTime = () => {
    setTimePassed((prev) => prev + 1);
  };

  const handleRun = () => {
    setRunning(true);
    const id = setInterval(() => {
      incrementTime();
    }, 1000);
    setIntervalId(id);
  };

  const handlePause = () => {
    setRunning(false);
    clearInterval(intervalId);
  };

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
    <div className='w-10/12 max-w-sm bg-gray-100 p-8 rounded-xl flex flex-col gap-8 items-center'>
      <div className='flex gap-4'>
        <button
          className={`bg-white py-2 px-6 rounded shadow cursor-pointer border-b-4 hover:border-b-red-400  ${
            mode === 'session' && 'border-red-500'
          }`}
          onClick={handleSetModeSession}>
          Session
        </button>
        <button
          className={`bg-white py-2 px-6 rounded shadow cursor-pointer border-b-4 hover:border-b-red-400  ${
            mode === 'break' && 'border-red-500'
          }`}
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
