import React from 'react';

type Props = {
  openSettings: () => void;
  openAccount: () => void;
};

const TopBar = ({ openSettings, openAccount }: Props) => {
  return (
    <div className='fixed top-0 flex justify-between w-full px-4 py-2 bg-gray-100'>
      <h1 className='text-2xl font-extrabold'>Pomodoro</h1>
      <div className='flex gap-6'>
        <button onClick={openAccount}>Account</button>
        <button onClick={openSettings}>Settings</button>
      </div>
    </div>
  );
};

export default TopBar;
