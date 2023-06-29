import RegisterForm from '@/components/account/RegisterForm';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getAuthSession();
  if (session?.user) redirect('/account/authenticated');

  return (
    <div className='w-full max-w-xl mt-20 mx-auto flex flex-col items-center gap-4 pb-16 bg-transparent p-2 rounded-xl'>
      <RegisterForm />
    </div>
  );
};

export default page;
