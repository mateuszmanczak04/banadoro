import LoginForm from '@/components/account/LoginForm';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getAuthSession();
  if (session?.user) redirect('/account/authenticated');

  return (
    <div className='w-11/12 max-w-xl mt-20 mx-auto flex flex-col items-center gap-4 pb-16'>
      <h1 className='text-3xl font-bold'>Login</h1>
      <div className='flex flex-col items-center gap-4 w-full'>
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
