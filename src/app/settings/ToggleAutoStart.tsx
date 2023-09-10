'use client';

import { getAutoStart, toggleAutoStart } from '@/redux/settings';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Button } from '../(common)/Button';

const ToggleAutoStart = () => {
  // redux
  const dispatch = useAppDispatch();
  const autoStart = useAppSelector(getAutoStart);

  const handleClick = () => {
    dispatch(toggleAutoStart());
  };

  return (
    <Button variant='secondary' className='w-full' onClick={handleClick}>
      Auto Start: {autoStart ? 'ON' : 'OFF'}
    </Button>
  );
};

export default ToggleAutoStart;
