import SignUpForm from '@/app/signup/SignUpForm';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getAuthSession();
  if (session?.user) redirect('/account');

  return (
    <div className='w-11/12 max-w-4xl mx-auto flex flex-col items-center gap-4 pb-16 bg-transparent rounded-xl'>
      <SignUpForm />
    </div>
  );
};

export default page;
