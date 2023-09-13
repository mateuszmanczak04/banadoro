'use client';

import useTasksContext from '@/hooks/useTasksContext';
import useTimerContext from '@/hooks/useTimerContext';
import { signOut } from 'next-auth/react';
import { Button } from './Button';

const SignOutButton = () => {
  const { resetTotalTime } = useTimerContext();
  const { setTasks } = useTasksContext();

  const handleSignOut = () => {
    setTasks([]);
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
