'use client';

import { useAppDispatch } from '@/redux/store';
import { setTasks } from '@/redux/tasks';
import { resetTotalTime } from '@/redux/timer';
import { signOut } from 'next-auth/react';
import { Button } from './Button';

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
    <Button variant='primary' onClick={handleSignOut}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
