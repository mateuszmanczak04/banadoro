'use client';

import Image from 'next/image';
import { FC } from 'react';
import { Button } from './Button';

const Error: FC<{ message: string; retry?: () => void }> = ({
  message,
  retry,
}) => {
  return (
    <div className='w-full bg-gray-800 p-6 rounded-xl flex justify-between items-center'>
      <div className='w-full max-w-lg mx-auto text-center flex flex-col gap-1'>
        <h2 className='text-3xl font-extrabold w-full'>An error occurred!</h2>
        <p className='leading-7 w-full'>{message}</p>
        <Image
          src='/monster-svgrepo-com.svg'
          alt='server icon'
          width={100}
          height={100}
          className='mx-auto'
        />
        {retry && (
          <Button
            variant='secondary'
            className='mt-2 mx-auto w-40'
            onClick={retry}>
            Try again
          </Button>
        )}
      </div>
    </div>
  );
};

export default Error;
