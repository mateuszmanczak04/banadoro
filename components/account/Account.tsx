'use client';

import { signOut, useSession } from 'next-auth/react';
import { resetTotalTime } from '@/redux/timer';
import { useAppDispatch } from '@/redux/store';
import { setTasks } from '@/redux/tasks';
import TotalTime from '@/components/account/TotalTime';
import { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Account = () => {
  // redux
  const dispatch = useAppDispatch();

  // session
  const { data: session, status } = useSession();

  const [authenticationStatus, setAuthenticationStatus] = useState<
    'login' | 'register' | 'loggedIn'
  >('login');

  useEffect(() => {
    if (status === 'authenticated') {
      setAuthenticationStatus('loggedIn');
    }
  }, [status]);

  const handleSignOut = () => {
    dispatch(setTasks([]));
    dispatch(resetTotalTime());
    signOut();
    close();
  };

  return (
    <div className='flex flex-col items-center gap-4 w-full'>
      {authenticationStatus === 'login' && (
        <LoginForm setAuthenticationStatus={setAuthenticationStatus} />
      )}
      {authenticationStatus === 'register' && (
        <RegisterForm setAuthenticationStatus={setAuthenticationStatus} />
      )}
      {authenticationStatus === 'loggedIn' && (
        <>
          <h2 className='bg-primary-500 text-primary-900 rounded py-1 px-4'>
            {session?.user?.email}
          </h2>
          <TotalTime />
          <button className='btn' onClick={handleSignOut}>
            Sign out
          </button>
        </>
      )}
    </div>
  );
};

export default Account;
