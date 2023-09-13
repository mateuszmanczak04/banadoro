'use client';

import useTimerContext from '@/hooks/useTimerContext';
import { useAppDispatch } from '@/redux/store';
import { setTasks } from '@/redux/tasks';
import { signOut } from 'next-auth/react';
import { Button } from './Button';

const SignOutButton = () => {
  // redux
  const dispatch = useAppDispatch();
  const { resetTotalTime } = useTimerContext();

  const handleSignOut = () => {
    dispatch(setTasks([]));
    resetTotalTime();
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
