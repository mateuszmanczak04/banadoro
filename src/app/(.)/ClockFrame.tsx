'use client';

import useSettingsContext from '@/hooks/useSettingsContext';
import useTimerContext from '@/hooks/useTimerContext';
import { Player } from '@lottiefiles/react-lottie-player';
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

  return (
    <div className='w-full p-8 rounded-xl flex flex-col gap-8 items-center bg-gray-800'>
      <div className='flex gap-4'>
        <button
          className={`py-2 px-6 rounded cursor-pointer transition duration-500 bg-gray-800 hover:text-primary-500 border-b-4 border-transparent ${
            mode === 'session' && 'border-primary-500 main-shadow'
          }`}
          onClick={handleSetModeSession}>
          Session
        </button>
        <button
          className={`py-2 px-6 rounded cursor-pointe transition duration-500 bg-gray-800 hover:text-primary-500 border-transparent border-b-4 ${
            mode === 'break' && 'border-primary-500 main-shadow'
          }`}
          onClick={handleSetModeBreak}>
          Break
        </button>
      </div>

      {mode === 'session' && (
        <Counter timeInSeconds={sessionTime - currentSessionTimePassed} />
      )}
      {mode === 'break' && (
        <Counter timeInSeconds={breakTime - currentSessionTimePassed} />
      )}

      {isTimerRunning ? (
        <>
          <Button variant='secondary' className='w-full' onClick={handlePause}>
            Pause
          </Button>
        </>
      ) : (
        <>
          <Button variant='primary' className='w-full' onClick={handleRun}>
            Start
          </Button>
        </>
      )}
      {isTimerRunning && (
        <Player
          autoplay
          loop
          src='/sand-timer.json'
          style={{ height: '80px', width: '80px' }}></Player>
      )}
    </div>
  );
};

export default ClockFrame;
