import { TimerSettingsContext } from '@/context/TimerSettingsContext';
import { useContext } from 'react';

const useTimerSettingsContext = () => {
  const context = useContext(TimerSettingsContext);

  if (!context) {
    throw new Error(
      'useTimerSettingsContext must be used within a TimerSettingsProvider'
    );
  }

  return context;
};

export default useTimerSettingsContext;
