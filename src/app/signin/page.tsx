import SignInForm from '@/app/signin/SignInForm';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getAuthSession();
  if (session?.user) redirect('/account');

  return (
    <div className='w-full max-w-xl mt-20 mx-auto flex flex-col items-center gap-4 pb-16 bg-transparent rounded-xl'>
      <SignInForm />
    </div>
  );
};

export default page;
