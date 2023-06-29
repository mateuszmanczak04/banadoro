import LoginForm from '@/components/account/LoginForm';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getAuthSession();
  if (session?.user) redirect('/account/authenticated');

  return (
    <div className='w-full max-w-xl mt-20 mx-auto flex flex-col items-center gap-4 pb-16 bg-transparent rounded-xl'>
      <LoginForm />
    </div>
  );
};

export default page;
