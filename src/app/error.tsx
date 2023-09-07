'use client';

import Image from 'next/image';
import { Button } from './(common)/Button';

type Props = {
  error: Error;
  reset: () => void;
};

const error = ({ error, reset }: Props) => {
  return (
    <div className='w-full flex justify-center text-black'>
      <div className='max-w-2xl w-11/12 mx-auto bg-gray-300 p-4 rounded-xl flex flex-col gap-6 items-center'>
        <Image src='/error-img.svg' alt='error img' width={64} height={64} />
        <h1 className='text-4xl font-black'>Error</h1>
        <p>{error.message}</p>
        <Button variant='primary' onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default error;
