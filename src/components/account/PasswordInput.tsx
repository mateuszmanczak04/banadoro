'use client';

import { FC, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: FC<PasswordInputProps> = ({ value, onChange }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleToggle = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      {show ? (
        <div className='relative w-full'>
          <input
            type='text'
            value={value}
            onChange={onChange}
            placeholder='SuperStrongPassword123#'
            className='rounded w-full p-2 pr-10 bg-gray-700 text-gray-200 border-2 border-gray-600 transition duration-100'
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
            value={value}
            onChange={onChange}
            placeholder='SuperStrongPassword123#'
            className='rounded w-full p-2 pr-10 bg-gray-700 text-gray-200 border-2 border-gray-600 transition duration-100'
          />
          <EyeIcon
            className='h-6 w-6 text-gray-300 absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 select-none'
            onClick={handleToggle}
          />
        </div>
      )}
    </>
  );
};

export default PasswordInput;
