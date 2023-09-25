'use client';

import {
  Cog6ToothIcon,
  TrophyIcon,
  ChartBarSquareIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import AuthLink from './AuthLink';
import { buttonVariants } from './Button';

const Navigation = () => {
  const { data: session } = useSession();

  return (
    <>
      {/* desktop version */}
      <div className='hidden xs:grid fixed shadow-[0px_0px_100px_-20px_rgba(3,7,18,1)] top-0 content-center w-full h-20 bg-gray-800 text-gray-200 z-10'>
        <div className='container flex justify-between items-center'>
          <Link
            href='/'
            className='text-2xl xs:text-3xl font-extrabold whitespace-nowrap flex items-center gap-2'>
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

            {session?.user && (
              <Link
                href='/stats'
                className={buttonVariants({ variant: 'secondary' })}>
                <ChartBarSquareIcon className='w-6 h-6' />
                <p className='hidden sm:block'>Stats</p>
              </Link>
            )}

            <Link
              href='/settings'
              className={buttonVariants({ variant: 'secondary' })}>
              <Cog6ToothIcon className='w-6 h-6' />
              <p className='hidden sm:block'>Settings</p>
            </Link>

            {!session?.user && <AuthLink />}
          </div>
        </div>
      </div>
      {/* mobile version */}
      {/* signed in */}
      {session?.user ? (
        <div className='fixed bottom-0 shadow-[0px_0px_100px_-20px_rgba(3,7,18,1)] flex justify-between xs:hidden w-full h-16 bg-gray-800 text-gray-200 z-10'>
          <div className='flex w-[calc(50%-1.25rem)]'>
            <Link
              href='/ranking'
              className={buttonVariants({
                variant: 'secondary',
                className: 'w-[48%] rounded-none',
              })}>
              <TrophyIcon className='w-6 h-6' />
            </Link>
            <Link
              href='/stats'
              className={buttonVariants({
                variant: 'secondary',
                className: 'w-[52%] rounded-none',
              })}>
              <ChartBarSquareIcon className='w-6 h-6' />
            </Link>
          </div>

          <Link
            href='/'
            className='rounded-full w-20 h-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-600 hover:bg-gray-500 grid place-items-center border-2 border-gray-500 hover:border-gray-400 transition'>
            <HomeIcon className='h-8 w-8' />
          </Link>

          <Link
            href='/settings'
            className={buttonVariants({
              variant: 'secondary',
              className: 'w-[calc(50%-1.25rem)] rounded-none',
            })}>
            <Cog6ToothIcon className='w-6 h-6' />
          </Link>
        </div>
      ) : (
        // signed out
        <div className='fixed bottom-0 shadow-[0px_0px_100px_-20px_rgba(3,7,18,1)] flex justify-between xs:hidden w-full h-16 bg-gray-800 text-gray-200 z-10'>
          <div className='flex w-[calc(50%-1.25rem)]'>
            <Link
              href='/ranking'
              className={buttonVariants({
                variant: 'secondary',
                className: 'w-[48%] rounded-none',
              })}>
              <TrophyIcon className='w-6 h-6' />
            </Link>
            <Link
              href='/settings'
              className={buttonVariants({
                variant: 'secondary',
                className: 'w-[52%] rounded-none',
              })}>
              <Cog6ToothIcon className='w-6 h-6' />
            </Link>
          </div>

          <Link
            href='/'
            className='rounded-full w-20 h-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-600 hover:bg-gray-500 grid place-items-center border-2 border-gray-500 hover:border-gray-400 transition'>
            <HomeIcon className='h-8 w-8' />
          </Link>

          <AuthLink className='w-[calc(50%-1.25rem)] rounded-none' />
        </div>
      )}
    </>
  );
};

export default Navigation;
