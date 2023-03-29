import React from 'react';

type Props = {
  timeInSeconds: number;
};

const Counter = ({ timeInSeconds }: Props) => {
  return (
    <div className='text-5xl bg-white shadow text-center px-8 py-4 rounded font-bold dark:bg-gray-700 dark:text-gray-200'>
      {Math.floor(timeInSeconds / 60)}:
      {('00' + (timeInSeconds % 60).toString()).slice(-2)}
    </div>
  );
};

export default Counter;
