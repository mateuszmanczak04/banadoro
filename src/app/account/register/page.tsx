import RegisterForm from '@/components/account/RegisterForm';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getAuthSession();
  if (session?.user) redirect('/account/authenticated');

  return (
    <div className='w-11/12 max-w-xl mt-20 mx-auto flex flex-col items-center gap-4 pb-16 bg-primary-200 dark:bg-transparent p-2 rounded-xl'>
      <h1 className='text-3xl font-bold'>Register</h1>
      <RegisterForm />
    </div>
  );
};

export default page;
