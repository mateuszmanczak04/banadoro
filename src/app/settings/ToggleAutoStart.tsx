'use client';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getAutoStart, toggleAutoStart } from '@/redux/settings';

const ToggleAutoStart = () => {
  // redux
  const dispatch = useAppDispatch();
  const autoStart = useAppSelector(getAutoStart);

  const handleClick = () => {
    dispatch(toggleAutoStart());
  };

  return (
    <button className='btn-secondary w-full' onClick={handleClick}>
      Auto Start: {autoStart ? 'ON' : 'OFF'}
    </button>
  );
};

export default ToggleAutoStart;
