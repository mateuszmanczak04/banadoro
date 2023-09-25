'use client';

import twClass from '@/lib/twClass';
import {
  Cog6ToothIcon,
  TrophyIcon,
  ChartBarSquareIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthLink from './AuthLink';
import { buttonVariants } from './Button';

const Navigation = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

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
              className={twClass(
                buttonVariants({
                  variant: 'secondary',
                }),
                pathname === '/ranking' && 'bg-gray-600 border-gray-500'
              )}>
              <TrophyIcon className='w-6 h-6' />
              <p className='hidden sm:block'>Ranking</p>
            </Link>

            {session?.user && (
              <Link
                href='/stats'
                className={twClass(
                  buttonVariants({
                    variant: 'secondary',
                  }),
                  pathname === '/stats' && 'bg-gray-600 border-gray-500'
                )}>
                <ChartBarSquareIcon className='w-6 h-6' />
                <p className='hidden sm:block'>Stats</p>
              </Link>
            )}

            <Link
              href='/settings'
              className={twClass(
                buttonVariants({
                  variant: 'secondary',
                }),
                pathname === '/settings' && 'bg-gray-600 border-gray-500'
              )}>
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
              className={twClass(
                'w-[48%] bg-gray-700 grid place-content-center',
                pathname === '/ranking' &&
                  'bg-gray-600 border-2 border-gray-500'
              )}>
              <TrophyIcon className='w-6 h-6' />
            </Link>
            <Link
              href='/stats'
              className={twClass(
                'w-[52%] bg-gray-700 grid place-content-center',
                pathname === '/stats' && 'bg-gray-600 border-2 border-gray-500'
              )}>
              <ChartBarSquareIcon className='w-6 h-6' />
            </Link>
          </div>

          <Link
            href='/'
            className={twClass(
              'rounded-full w-20 h-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-600 hover:bg-gray-500 grid place-items-center border-2 border-gray-500 hover:border-gray-400 hover:text-white transition',
              pathname === '/' && 'bg-gray-500 border-2 border-gray-400'
            )}>
            <HomeIcon className='h-8 w-8' />
          </Link>

          <Link
            href='/settings'
            className={twClass(
              'w-[calc(50%-1.25rem)] bg-gray-700 grid place-content-center',
              pathname === '/settings' && 'bg-gray-600 border-2 border-gray-500'
            )}>
            <Cog6ToothIcon className='w-6 h-6' />
          </Link>
        </div>
      ) : (
        // signed out
        <div className='fixed bottom-0 shadow-[0px_0px_100px_-20px_rgba(3,7,18,1)] flex justify-between xs:hidden w-full h-16 bg-gray-800 text-gray-200 z-10'>
          <div className='flex w-[calc(50%-1.25rem)]'>
            <Link
              href='/ranking'
              className={twClass(
                'w-[48%] bg-gray-700 grid place-content-center',
                pathname === '/ranking' &&
                  'bg-gray-600 border-2 border-gray-500'
              )}>
              <TrophyIcon className='w-6 h-6' />
            </Link>
            <Link
              href='/settings'
              className={twClass(
                'w-[52%] bg-gray-700 grid place-content-center',
                pathname === '/settings' &&
                  'bg-gray-600 border-2 border-gray-500'
              )}>
              <Cog6ToothIcon className='w-6 h-6' />
            </Link>
          </div>

          <Link
            href='/'
            className={twClass(
              'rounded-full w-20 h-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-600 hover:bg-gray-500 grid place-items-center border-2 border-gray-500 hover:border-gray-400 hover:text-white transition',
              pathname === '/' && 'bg-gray-500 border-2 border-gray-400'
            )}>
            <HomeIcon className='h-8 w-8' />
          </Link>

          <AuthLink className='w-[calc(50%-1.25rem)] rounded-none' />
        </div>
      )}
    </>
  );
};

export default Navigation;
