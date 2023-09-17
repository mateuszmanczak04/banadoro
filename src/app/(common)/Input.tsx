'use client';

import twClass from '@/lib/twClass';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { FC, InputHTMLAttributes, useState } from 'react';

// interface Props {
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   type?: string;
//   placeholder?: string;
// }

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<Props> = ({ className, ...props }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleToggle = () => {
    setShow((prev) => !prev);
  };

  if (props.type === 'password') {
    return (
      <>
        {show ? (
          <div className='relative w-full'>
            <input
              type='text'
              className={twClass(
                'rounded w-full p-2 pr-10 bg-gray-700 text-gray-200 border-2 border-gray-600 transition duration-100 placeholder:text-gray-500 outline-none focus:border-primary-300 focus:border-opacity-30',
                className
              )}
              {...props}
            />
            <EyeSlashIcon
              className='h-6 w-6 text-gray-500 absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 select-none'
              onClick={handleToggle}
            />
          </div>
        ) : (
          <div className='relative w-full'>
            <input
              type='password'
              className={twClass(
                'rounded w-full p-2 pr-10 bg-gray-700 text-gray-200 border-2 border-gray-600 transition duration-100 placeholder:text-gray-500 outline-none focus:border-primary-300 focus:border-opacity-30',
                className
              )}
              {...props}
            />
            <EyeIcon
              className='h-6 w-6 text-gray-300 absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 select-none'
              onClick={handleToggle}
            />
          </div>
        )}
      </>
    );
  }

  return (
    <input
      type='text'
      className={twClass(
        'rounded w-full p-2 bg-gray-700 text-gray-200 border-2 border-gray-600 transition duration-100 placeholder:text-gray-500 outline-none focus:border-primary-300 focus:border-opacity-30',
        props.type === 'number' &&
          '[-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none',
        className
      )}
      {...props}
    />
  );
};

export default Input;
