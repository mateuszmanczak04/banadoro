import { LocalSettingsContext } from '@/context/LocalSettingsContext';
import { useContext } from 'react';

const useLocalSettingsContext = () => {
  const context = useContext(LocalSettingsContext);

  if (!context) {
    throw new Error(
      'useLocalSettingsContext must be used within a LocalSettingsProvider'
    );
  }

  return context;
};

export default useLocalSettingsContext;
