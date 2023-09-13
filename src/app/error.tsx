'use client';

import { FC } from 'react';
import { Button } from './(common)/Button';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  error: Error;
  reset: () => void;
}

const error: FC<Props> = ({ error, reset }) => {
  return (
    <div className='w-full flex justify-center text-white'>
      <div className='max-w-2xl w-11/12 mx-auto bg-gray-800 p-4 rounded-xl flex flex-col items-center'>
        <ExclamationCircleIcon className='h-40 w-40 text-white' />
        <h1 className='text-4xl font-medium'>Error</h1>
        <p>{error.message}</p>
        <Button variant='primary' className='mt-8' onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default error;
