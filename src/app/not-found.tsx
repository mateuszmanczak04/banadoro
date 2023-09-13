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
    <div className='w-full flex justify-center'>
      <div className='max-w-2xl w-11/12 mx-auto bg-gray-800 p-4 rounded-xl flex flex-col items-center'>
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
