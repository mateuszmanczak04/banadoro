'use client';

import { FC } from 'react';
import Error from './(common)/Error';

interface Props {
  error: Error;
  reset: () => void;
}

const error: FC<Props> = ({ error, reset }) => {
  return (
    <div className='bottom-menu container'>
      <Error message={error.message} retry={reset} />
    </div>
  );
};

export default error;
