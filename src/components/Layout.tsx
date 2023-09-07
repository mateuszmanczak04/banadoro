'use client';

import TopBar from './TopBar';
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
