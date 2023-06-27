'use client';

import '@/styles/globals.css';
import TopBar from './TopBar';
import { initTheme } from '@/redux/settings';
import { useAppDispatch } from '@/redux/store';
import { fetchAllUserTasks } from '@/redux/tasks';
import { fetchAllUserDays } from '@/redux/timer';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  // redux
  const dispatch = useAppDispatch();

  // session
  const { data: session } = useSession();

  useEffect(() => {
    dispatch(initTheme());
    if (session) {
      dispatch(fetchAllUserDays());
      dispatch(fetchAllUserTasks());
    }
  }, [dispatch, session]);

  return (
    <>
      <TopBar />
      <div className='mt-24'>{children}</div>
    </>
  );
};

export default Layout;
