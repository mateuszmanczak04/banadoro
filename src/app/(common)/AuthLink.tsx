'use client';

import useLocalSettingsContext from '@/hooks/useLocalSettingsContext';
import twClass from '@/lib/twClass';
import {
  ArrowTopRightOnSquareIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { buttonVariants } from './Button';
import Loading from './Loading';

const AuthLink: FC<{ className?: string }> = ({ className = '' }) => {
  const { status } = useSession();
  const { hasAccount } = useLocalSettingsContext();
  const pathname = usePathname();

  if (status === 'loading') return <Loading />;

  return (
    <Link
      href={hasAccount ? '/signin' : '/signup'}
      className={twClass(
        buttonVariants({
          variant: 'primary',
        }),
        (pathname === '/signup' || pathname === '/signin') &&
          'bg-primary-400 border-primary-300',
        className
      )}>
      {hasAccount ? (
        <>
          <ArrowRightOnRectangleIcon className='h-6 w-6 text-gray-900' />
          <p>Sign In</p>
        </>
      ) : (
        <>
          <ArrowTopRightOnSquareIcon className='h-6 w-6 text-gray-900' />
          <p>Sign Up</p>
        </>
      )}
    </Link>
  );
};

export default AuthLink;
