import TotalTime from '@/app/account/TotalTime';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SignOutButton from '../(common)/SignOutButton';

const page = async () => {
  // session
  const session = await getAuthSession();

  /* if a user is not signed in, then redirect him to sign up page */
  if (!session || !session.user) redirect('/signup');

  return (
    <div className='w-full max-w-4xl mt-20 mx-auto flex flex-col items-center gap-4 pb-16 bg-transparent p-2 rounded-xl'>
      <h1 className='text-3xl font-bold'>Account</h1>
      <div className='flex flex-col items-center gap-4 w-full'>
        <TotalTime />
        <SignOutButton />
      </div>
    </div>
  );
};

export default page;
