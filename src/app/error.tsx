'use client';

import { FC } from 'react';
import Error from './(common)/Error';

interface Props {
  error: Error;
  reset: () => void;
}

const error: FC<Props> = ({ error, reset }) => {
  return (
    <div className='mt-28 w-full max-w-4xl mx-auto'>
      <Error message={error.message} retry={reset} />
    </div>
  );
};

export default error;
