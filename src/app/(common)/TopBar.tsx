'use client';

import {
  Cog6ToothIcon,
  TrophyIcon,
  ChartBarSquareIcon,
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import AuthLink from './AuthButton';
import { buttonVariants } from './Button';
import {} from '@heroicons/react/24/outline';

const TopBar = () => {
  const { data: session } = useSession();

  return (
    <div className='fixed top-0 grid content-center w-full h-16 sm:h-20 bg-gray-800 text-gray-200 z-10'>
      <div className='w-full max-w-4xl px-4 flex justify-between items-center mx-auto'>
        <Link
          href='/'
          className='text-2xl sm:text-3xl font-extrabold whitespace-nowrap flex items-center gap-2'>
          <Image src='/logo.svg' alt='logo' width={64} height={64} />
          <span className='hidden sm:block'>Banadoro</span>
        </Link>
        <div className='flex gap-2 items-center'>
          <Link
            href='/ranking'
            className={buttonVariants({ variant: 'secondary' })}>
            <TrophyIcon className='w-6 h-6' />
            <p className='hidden sm:block'>Ranking</p>
          </Link>

          <Link
            href='/settings'
            className={buttonVariants({ variant: 'secondary' })}>
            <Cog6ToothIcon className='w-6 h-6' />
            <p className='hidden sm:block'>Settings</p>
          </Link>

          {session?.user ? (
            <Link
              href='/stats'
              className={buttonVariants({ variant: 'secondary' })}>
              <ChartBarSquareIcon className='w-6 h-6' />
              <p className='hidden sm:block'>Stats</p>
            </Link>
          ) : (
            <AuthLink />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
