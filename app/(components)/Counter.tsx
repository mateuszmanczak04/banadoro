import React from 'react';

type Props = {
  timeInSeconds: number;
};

const Counter = ({ timeInSeconds }: Props) => {
  return (
    <div className='text-4xl bg-white shadow text-center px-8 py-4 rounded font-bold'>
      {Math.floor(timeInSeconds / 60)}:
      {('00' + (timeInSeconds % 60).toString()).slice(-2)}
    </div>
  );
};

export default Counter;
