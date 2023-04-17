import React from 'react';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { TrophyIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

type Props = {
  openSettings: () => void;
  openAccount: () => void;
  openRanking: () => void;
};

const TopBar = ({ openSettings, openAccount, openRanking }: Props) => {
  const width = useWindowWidth();

  return (
    <div className='fixed top-0 flex justify-between w-full px-4 py-2 bg-primary-300 dark:bg-gray-800 dark:text-gray-200 z-10'>
      <h1 className='sm:text-2xl text-xl font-extrabold whitespace-nowrap'>
        Banadoro 🍌
      </h1>
      <div className='flex gap-6'>
        <button onClick={openRanking}>
          {width >= 640 ? 'Ranking' : <TrophyIcon className='h-6 w-6' />}
        </button>
        <button onClick={openAccount}>
          {width >= 640 ? 'Account' : <UserCircleIcon className='h-6 w-6' />}
        </button>
        <button onClick={openSettings}>
          {width >= 640 ? 'Setting' : <Cog6ToothIcon className='h-6 w-6' />}
        </button>
      </div>
    </div>
  );
};

export default TopBar;
