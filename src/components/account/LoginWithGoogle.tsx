'use client';

import { signIn } from 'next-auth/react';

const LoginWithGoogle = ({ text }: { text: string }) => {
  return (
    <div className='google-button' onClick={() => signIn('google')}>
      {text}
    </div>
  );
};

export default LoginWithGoogle;
