import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getTheme, toggleTheme } from '../../redux/theme';

const ToggleDarkMode = () => {
  // redux
  const dispatch = useAppDispatch();
  const theme = useAppSelector(getTheme);

  const handleClick = () => {
    dispatch(toggleTheme());
  };

  if (theme === 'dark') {
    return (
      <div
        className='bg-white text-gray-800 w-full p-2 rounded text-center cursor-pointer hover:bg-gray-100 hover:text-gray-700'
        onClick={handleClick}>
        Light Mode
      </div>
    );
  }

  return (
    <div
      className='bg-gray-800 text-gray-100 w-full p-2 rounded text-center cursor-pointer hover:bg-gray-700 hover:text-gray-200'
      onClick={handleClick}>
      Dark Mode
    </div>
  );
};

export default ToggleDarkMode;
