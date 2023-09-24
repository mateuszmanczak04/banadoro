'use client';

import TotalTime from '@/app/stats/TotalTime';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Loading from '../loading';

const StatsPage = () => {
  const { status } = useSession();

  if (status === 'loading') return <Loading />;

  if (status === 'unauthenticated') redirect('/');

  return (
    <div className='bottom-menu container flex flex-col items-center gap-4 rounded-xl'>
      <h1 className='text-3xl font-bold'>Stats</h1>
      <div className='flex flex-col items-center gap-4 w-full'>
        <TotalTime />
      </div>
    </div>
  );
};

export default StatsPage;
