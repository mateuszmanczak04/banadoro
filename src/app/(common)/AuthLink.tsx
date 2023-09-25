'use client';

import useSettingsContext from '@/hooks/useSettingsContext';
import {
  ArrowTopRightOnSquareIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { FC } from 'react';
import { buttonVariants } from './Button';

const AuthLink: FC<{ className?: string }> = ({ className = '' }) => {
  const { hasAccount } = useSettingsContext();

  return (
    <Link
      href={hasAccount ? '/signin' : '/signup'}
      className={buttonVariants({
        variant: 'primary',
        className,
      })}>
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
