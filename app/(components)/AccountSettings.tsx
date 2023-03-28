import { signOut, useSession } from 'next-auth/react';
import React from 'react';

const AccountSettings = () => {
  const { data: session } = useSession();

  return (
    <div className='flex flex-col items-center gap-4 w-full'>
      <h2 className='bg-gray-700 text-white rounded py-1 px-4'>
        {session?.user?.email}
      </h2>
      <button className='btn' onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
};

export default AccountSettings;
