'use client';

import { signIn } from 'next-auth/react';

const LoginWithGoogle = ({ text }: { text: string }) => {
  const handleLogin = async () => {
    await signIn('google', {
      callbackUrl: '/',
    });
  };

  return (
    <div className='google-button' onClick={handleLogin}>
      {text}
    </div>
  );
};

export default LoginWithGoogle;
