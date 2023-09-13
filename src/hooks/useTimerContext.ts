import { TimerContext } from '@/context/TimerContext';
import { useContext } from 'react';

const useTimerContext = () => {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }

  return context;
};

export default useTimerContext;
