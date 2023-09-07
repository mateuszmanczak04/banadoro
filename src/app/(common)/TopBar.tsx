import { TrophyIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Props = {
  session: any;
};

const TopBar = ({ session }: Props) => {
  return (
    <div className='fixed top-0 grid content-center w-full px-4 h-16 sm:h-20 bg-gray-800 text-gray-200 z-10'>
      <div className='w-full max-w-3xl flex justify-between items-center mx-auto'>
        <Link
          href='/'
          className='text-2xl sm:text-3xl font-extrabold whitespace-nowrap flex items-center gap-2'>
          🍌<span className='hidden sm:block'>Banadoro</span>
        </Link>
        <div className='flex gap-2 items-center'>
          <Link href='/ranking' className='btn-secondary'>
            <TrophyIcon className='w-6 h-6' />
            <p className='hidden sm:block'>Ranking</p>
          </Link>

          <Link href='/settings' className='btn-secondary'>
            <Cog6ToothIcon className='w-6 h-6' />
            <p className='hidden sm:block'>Settings</p>
          </Link>

          {session && session.user ? (
            <Link href='/account' className='btn-primary'>
              <UserCircleIcon className='w-6 h-6' />
              <p className='hidden sm:block'>Account</p>
            </Link>
          ) : (
            <Link href='/signup' className='btn-primary'>
              <ArrowTopRightOnSquareIcon className='h-6 w-6 text-gray-900' />
              <p className='hidden sm:block'>Sign Up</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
