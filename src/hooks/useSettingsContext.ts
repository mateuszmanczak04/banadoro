import { SettingsContext } from '@/context/SettingsContext';
import { useContext } from 'react';

const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      'useSettingsContext must be used within a SettingsProvider'
    );
  }

  return context;
};

export default useSettingsContext;
