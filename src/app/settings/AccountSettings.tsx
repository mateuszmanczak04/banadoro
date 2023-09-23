'use client';

import { useSession } from 'next-auth/react';
import SignOutButton from '../(common)/SignOutButton';
import ChangePassword from './ChangePassword';

const AccountSettings = () => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className='flex flex-col gap-4 w-full'>
      <h3 className='font-extrabold text-3xl w-full'>Account</h3>
      <ChangePassword />
      <SignOutButton />
    </div>
  );
};

export default AccountSettings;
