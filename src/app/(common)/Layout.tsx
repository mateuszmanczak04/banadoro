'use client';

import { useAppDispatch } from '@/redux/store';
import { fetchAllUserTasks } from '@/redux/tasks';
import { fetchAllUserDays } from '@/redux/timer';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import TopBar from './TopBar';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  // redux
  const dispatch = useAppDispatch();

  // session
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      dispatch(fetchAllUserDays());
      dispatch(fetchAllUserTasks());
    }
  }, [dispatch, session]);

  return (
    <>
      <TopBar session={session} />
      <div className='mt-24'>{children}</div>
    </>
  );
};

export default Layout;
