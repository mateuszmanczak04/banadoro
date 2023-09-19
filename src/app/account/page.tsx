import TotalTime from '@/app/account/TotalTime';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SignOutButton from '../(common)/SignOutButton';

const page = async () => {
  // session
  const session = await getAuthSession();

  /* if a user is not signed in, then redirect him to sign up page */
  if (!session || !session.user) redirect('/');

  return (
    <div className='w-11/12 max-w-4xl mx-auto flex flex-col items-center gap-4 pb-16 bg-transparent rounded-xl'>
      <h1 className='text-3xl font-bold'>Account</h1>
      <div className='flex flex-col items-center gap-4 w-full'>
        <TotalTime />
        <SignOutButton />
      </div>
    </div>
  );
};

export default page;
