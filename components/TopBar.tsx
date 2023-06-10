'use client';

import { useWindowWidth } from '@/hooks/useWindowWidth';
import { initTheme } from '@/redux/settings';
import { useAppDispatch } from '@/redux/store';
import { fetchAllUserTasks } from '@/redux/tasks';
import { fetchAllUserDays } from '@/redux/timer';
import { TrophyIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const TopBar = () => {
  const width = useWindowWidth();
  const pathname = usePathname();

  // redux
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initTheme());
    dispatch(fetchAllUserDays());
    dispatch(fetchAllUserTasks());
  }, [dispatch]);

  return (
    <div className='fixed top-0 flex justify-between w-full px-4 py-2 bg-primary-300 dark:bg-gray-800 dark:text-gray-200 z-10'>
      <Link
        href='/'
        className='text-2xl sm:text-3xl font-extrabold whitespace-nowrap'>
        Banadoro 🍌
      </Link>
      <div className='flex gap-6 items-center'>
        {pathname !== '/ranking' && (
          <Link href='/ranking' className='flex items-center gap-1'>
            {width >= 640 ? (
              <>
                <TrophyIcon className='h-4 w-4' /> <p>Ranking</p>
              </>
            ) : (
              <TrophyIcon className='h-6 w-6' />
            )}
          </Link>
        )}
        {pathname !== '/account' && (
          <Link href='/account' className='flex items-center gap-1'>
            {width >= 640 ? (
              <>
                <UserCircleIcon className='h-4 w-4' /> <p>Account</p>
              </>
            ) : (
              <UserCircleIcon className='h-6 w-6' />
            )}
          </Link>
        )}
        {pathname !== '/settings' && (
          <Link href='/settings' className='flex items-center gap-1'>
            {width >= 640 ? (
              <>
                <Cog6ToothIcon className='h-4 w-4' /> <p>Settings</p>
              </>
            ) : (
              <Cog6ToothIcon className='h-6 w-6' />
            )}
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopBar;
