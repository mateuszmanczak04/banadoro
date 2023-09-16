'use client';

import useSettingsContext from '@/hooks/useSettingsContext';
import { Button } from '../(common)/Button';

const ToggleAutoStart = () => {
  const { autoStart, setAutoStart } = useSettingsContext();

  const handleClick = () => {
    setAutoStart(!autoStart);
  };

  return (
    <Button variant='secondary' className='w-full' onClick={handleClick}>
      Auto Start: {autoStart ? 'ON' : 'OFF'}
    </Button>
  );
};

export default ToggleAutoStart;
