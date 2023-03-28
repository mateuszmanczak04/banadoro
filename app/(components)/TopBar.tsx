import React from 'react';

type Props = {
  openSettings: () => void;
};

const TopBar = ({ openSettings }: Props) => {
  return (
    <div className='fixed top-0 flex justify-between w-full px-4 py-2 bg-gray-100'>
      <h1 className='text-2xl font-extrabold'>Pomodoro</h1>
      <button onClick={openSettings}>Settings</button>
    </div>
  );
};

export default TopBar;
