'use client';

import { useAppDispatch } from '@/redux/store';
import { setTasks } from '@/redux/tasks';
import { resetTotalTime } from '@/redux/timer';
import { signOut } from 'next-auth/react';

const SignOutButton = () => {
  // redux
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(setTasks([]));
    dispatch(resetTotalTime());
    signOut();
    close();
  };

  return (
    <button className='btn-primary' onClick={handleSignOut}>
      Sign out
    </button>
  );
};

export default SignOutButton;
