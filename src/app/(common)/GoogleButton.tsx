'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

const GoogleButton = ({ text }: { text: string }) => {
  const handleLogin = async () => {
    await signIn('google', {
      callbackUrl: '/',
    });
  };

  return (
    <button
      className='w-full py-1 px-3 rounded shadow cursor-pointer transition text-center text-white flex items-center justify-center gap-2 bg-gray-700 duration-300 hover:bg-gray-600'
      onClick={handleLogin}>
      <Image src='/google-icon.svg' width={20} height={20} alt='google icon' />
      <p>{text}</p>
    </button>
  );
};

export default GoogleButton;
