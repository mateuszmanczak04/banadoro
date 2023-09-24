'use client';

import Link from 'next/link';
import { FC } from 'react';
import { buttonVariants } from './(common)/Button';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  error: Error;
  reset: () => void;
}

const NotFound: FC<Props> = () => {
  return (
    <div className='bottom-menu w-full flex justify-center'>
      <div className='container bg-gray-800 rounded-xl flex flex-col items-center'>
        <QuestionMarkCircleIcon className='h-40 w-40 text-white' />
        <h1 className='text-4xl font-medium'>Page not found</h1>
        <Link
          href='/'
          className={buttonVariants({ variant: 'primary', className: 'mt-8' })}>
          Go to homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
