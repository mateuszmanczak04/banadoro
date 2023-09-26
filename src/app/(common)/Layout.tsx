'use client';

import { ReactNode } from 'react';
import TimerModal from './TimerModal';
import Navigation from './Navigation';
import { useSession } from 'next-auth/react';
import Loading from './Loading';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { status } = useSession();

  if (status === 'loading')
    return (
      <div className='bottom-menu container'>
        <Loading />
      </div>
    );

  return (
    <>
      {/* @ts-ignore server component */}
      <Navigation />
      <TimerModal />
      <div>{children}</div>
    </>
  );
};

export default Layout;
