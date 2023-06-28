'use client';

import Image from 'next/image';

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
        <button
          onClick={reset}
          className='bg-primary-500 px-4 py-2 rounded-md shadow-md'>
          Try again
        </button>
      </div>
    </div>
  );
};

export default error;
