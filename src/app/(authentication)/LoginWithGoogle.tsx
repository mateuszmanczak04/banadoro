'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

const LoginWithGoogle = ({ text }: { text: string }) => {
  const handleLogin = async () => {
    await signIn('google', {
      callbackUrl: '/',
    });
  };

  return (
    <button className='google-button' onClick={handleLogin}>
      <Image src='/google-icon.svg' width={20} height={20} alt='google icon' />
      <p>{text}</p>
    </button>
  );
};

export default LoginWithGoogle;
