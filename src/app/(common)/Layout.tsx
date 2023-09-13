'use client';

import useTimerContext from '@/hooks/useTimerContext';
import { useAppDispatch } from '@/redux/store';
import { fetchAllUserTasks } from '@/redux/tasks';

import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import TopBar from './TopBar';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  // redux
  const dispatch = useAppDispatch();
  const { fetchAllUserDays } = useTimerContext();

  // session
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetchAllUserDays();
      dispatch(fetchAllUserTasks());
    }
  }, [dispatch, session, fetchAllUserDays]);

  return (
    <>
      <TopBar session={session} />
      <div className='mt-24'>{children}</div>
    </>
  );
};

export default Layout;
