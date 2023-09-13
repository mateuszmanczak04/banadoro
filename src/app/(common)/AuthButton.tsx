'use client';

import useSettingsContext from '@/hooks/useSettingsContext';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { buttonVariants } from './Button';

const AuthLink = () => {
  const { hasAccount } = useSettingsContext();

  if (hasAccount === null) return null;

  return (
    <Link href='/signup' className={buttonVariants({ variant: 'primary' })}>
      <ArrowTopRightOnSquareIcon className='h-6 w-6 text-gray-900' />
      <p className='hidden sm:block'>{hasAccount ? 'Sign In' : 'Sign Up'}</p>
    </Link>
  );
};

export default AuthLink;
