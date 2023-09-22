'use client';

import useSettingsContext from '@/hooks/useSettingsContext';
import useTimerContext from '@/hooks/useTimerContext';
import { Button } from '../(common)/Button';
import Counter from './Counter';

const ClockFrame = () => {
  const {
    mode,
    setMode,
    currentSessionTimePassed,
    setCurrentSessionTimePassed,
    handlePause,
    isTimerRunning,
    handleRun,
  } = useTimerContext();
  const { sessionTime, breakTime } = useSettingsContext();

  // changing modes
  const handleSetModeSession = () => {
    if (mode === 'session') return;
    setMode('session');
    setCurrentSessionTimePassed(0);
    handlePause();
  };
  const handleSetModeBreak = () => {
    if (mode === 'break') return;
    setMode('break');
    setCurrentSessionTimePassed(0);
    handlePause();
  };

  const getTimeInSeconds = () => {
    return mode === 'session'
      ? sessionTime - currentSessionTimePassed
      : breakTime - currentSessionTimePassed;
  };

  return (
    <div className='mx-auto p-4 md:rounded-md flex flex-col gap-4 items-center bg-gray-800 w-full'>
      <h2 className='text-3xl font-extrabold w-full text-center rounded px-2'>
        Focus!
      </h2>
      <div className='w-full flex gap-4'>
        <div className='rounded-md flex-[2] overflow-hidden flex'>
          <Button
            variant={mode === 'session' ? 'primary' : 'secondary'}
            className='flex-1 rounded-none'
            onClick={handleSetModeSession}>
            Session
          </Button>
          <Button
            variant={mode === 'session' ? 'secondary' : 'primary'}
            className='flex-1 rounded-none'
            onClick={handleSetModeBreak}>
            Break
          </Button>
        </div>
        <Button
          variant={isTimerRunning ? 'secondary' : 'primary'}
          className='flex-1'
          onClick={() => {
            if (isTimerRunning) handlePause();
            else handleRun();
          }}>
          {isTimerRunning ? 'Pause' : 'Start'}
        </Button>
      </div>

      <Counter timeInSeconds={getTimeInSeconds()} />
    </div>
  );
};

export default ClockFrame;
