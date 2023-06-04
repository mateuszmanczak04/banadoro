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
    <div
      className='bg-primary-200 shadow text-gray-800 w-full p-2 rounded text-center cursor-pointer hover:bg-primary-100 hover:text-gray-700'
      onClick={handleClick}>
      Auto Start: {autoStart ? 'ON' : 'OFF'}
    </div>
  );
};

export default ToggleAutoStart;
