'use client';

import useSettingsContext from '@/hooks/useSettingsContext';
import useTimerContext from '@/hooks/useTimerContext';
import { Player } from '@lottiefiles/react-lottie-player';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../(common)/Button';
import Counter from './Counter';

const ClockFrame = () => {
  const { autoStart } = useSettingsContext();

  const { sessionTime, breakTime, incrementUserTimeByAMinute } =
    useTimerContext();

  // state
  const [running, setRunning] = useState<boolean>(false);
  const [timePassed, setTimePassed] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<any>();
  const [mode, setMode] = useState<'session' | 'break'>('session');

  // audio notification
  const playNotification = () => {
    let audio = new Audio('/bell.wav');
    audio.play();
  };

  // session
  const { data: session } = useSession();

  const incrementTime = () => {
    setTimePassed((prev) => prev + 1);
  };

  // updating total time
  useEffect(() => {
    if (mode === 'session' && timePassed > 0 && timePassed % 2 === 0) {
      incrementUserTimeByAMinute();
    }
  }, [timePassed, incrementUserTimeByAMinute, mode]);

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
      if (!autoStart) handlePause();
      setMode('break');
      setTimePassed(0);
      playNotification();
      return;
    } else if (mode === 'break' && timePassed === breakTime) {
      setTimePassed(0);
      if (!autoStart) handlePause();
      setMode('session');
      playNotification();
      return;
    }
  }, [timePassed, handlePause, mode, sessionTime, breakTime, autoStart]);

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
        <Counter timeInSeconds={sessionTime - timePassed} />
      )}
      {mode === 'break' && <Counter timeInSeconds={breakTime - timePassed} />}

      {running ? (
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
      {running && (
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
