import SignUpForm from '@/app/signup/SignUpForm';
import { getAuthSession } from '@/lib/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getAuthSession();
  if (session?.user) redirect('/account');

  return (
    <div className='w-11/12 max-w-4xl mx-auto py-20 h-screen flex gap-4'>
      <div className='flex-1 hidden p-8 lg:flex flex-col items-center justify-center text-center gap-8 max-w-md mx-auto opacity-[100vw / 1000px]'>
        <Image
          src='/goal-success-svgrepo-com.svg'
          alt='smile icon'
          width={200}
          height={200}
        />
        <h1 className='font-extrabold text-5xl leading-[90%]'>
          Reach your <span className='text-primary-400'>goals</span> with us!
        </h1>
        <p className='leading-7'>
          Improve your focus and become better version of yourself{' '}
          <span className='text-primary-500'>EVERY DAY</span>.
        </p>
      </div>
      <SignUpForm />
    </div>
  );
};

export default page;
