import React from 'react';

type Props = {
  openSettings: () => void;
  openAccount: () => void;
  openRanking: () => void;
};

const TopBar = ({ openSettings, openAccount, openRanking }: Props) => {
  return (
    <div className='fixed top-0 flex justify-between w-full px-4 py-2 bg-primary-300 dark:bg-gray-800 dark:text-gray-200'>
      <h1 className='text-2xl font-extrabold'>Banadoro 🍌</h1>
      <div className='flex gap-6'>
        <button onClick={openRanking}>Ranking</button>
        <button onClick={openAccount}>Account</button>
        <button onClick={openSettings}>Settings</button>
      </div>
    </div>
  );
};

export default TopBar;
