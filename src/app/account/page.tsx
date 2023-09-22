'use client';

import TotalTime from '@/app/account/TotalTime';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import SignOutButton from '../(common)/SignOutButton';
import Loading from '../loading';

const AccountPage = () => {
  const { status } = useSession();

  if (status === 'loading') return <Loading />;

  if (status === 'unauthenticated') redirect('/');

  return (
    <div className='mt-28 w-11/12 max-w-4xl mx-auto flex flex-col items-center gap-4 pb-16 bg-transparent rounded-xl'>
      <h1 className='text-3xl font-bold'>Account</h1>
      <div className='flex flex-col items-center gap-4 w-full'>
        <TotalTime />
        <SignOutButton />
      </div>
    </div>
  );
};

export default AccountPage;
