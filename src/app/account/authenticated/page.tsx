import SignOutButton from '@/components/account/SignOutButton';
import TotalTime from '@/components/account/TotalTime';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getAuthSession();
  if (!session || !session.user) redirect('/account/register');

  return (
    <div className='w-11/12 max-w-4xl mt-20 mx-auto flex flex-col items-center gap-4'>
      <h1 className='text-3xl font-bold'>Account</h1>
      <div className='flex flex-col items-center gap-4 w-full'>
        <TotalTime />
        <SignOutButton />
      </div>
    </div>
  );
};

export default page;
