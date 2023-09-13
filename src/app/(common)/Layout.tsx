'use client';

import useTimerContext from '@/hooks/useTimerContext';

import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import TopBar from './TopBar';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { fetchAllUserDays } = useTimerContext();

  // session
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetchAllUserDays();
    }
  }, [session, fetchAllUserDays]);

  return (
    <>
      <TopBar session={session} />
      <div className='mt-24'>{children}</div>
    </>
  );
};

export default Layout;
