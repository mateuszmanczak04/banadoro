'use client';

import { initTheme } from '@/redux/settings';
import { useAppDispatch } from '@/redux/store';
import { fetchAllUserTasks } from '@/redux/tasks';
import { fetchAllUserDays } from '@/redux/timer';
import { TrophyIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const TopBar = () => {
  const pathname = usePathname();

  // redux
  const dispatch = useAppDispatch();

  // session
  const { data: session } = useSession();

  useEffect(() => {
    dispatch(initTheme());
    if (session) {
      dispatch(fetchAllUserDays());
      dispatch(fetchAllUserTasks());
    }
  }, [dispatch, session]);

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
            <TrophyIcon className='h-4 w-4' />{' '}
            <p className='hidden sm:block'>Ranking</p>
          </Link>
        )}
        {pathname !== '/account' && (
          <Link href='/account' className='flex items-center gap-1'>
            <UserCircleIcon className='h-4 w-4' />{' '}
            <p className='hidden sm:block'>Account</p>
          </Link>
        )}
        {pathname !== '/settings' && (
          <Link href='/settings' className='flex items-center gap-1'>
            <Cog6ToothIcon className='h-4 w-4' />{' '}
            <p className='hidden sm:block'>Settings</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopBar;
