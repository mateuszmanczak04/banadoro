'use client';

import SignInForm from '@/app/signin/SignInForm';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Loading from '../loading';

const SignInPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'loading') return <Loading />;

  if (status === 'authenticated') return router.replace('/');

  return (
    <div className='w-11/12 max-w-4xl mx-auto py-20 h-screen flex gap-4'>
      <div className='flex-1 hidden p-8 lg:flex flex-col items-center justify-center text-center gap-8 max-w-md mx-auto opacity-[100vw / 1000px]'>
        <Image
          src='/smile-svgrepo-com.svg'
          alt='smile icon'
          width={200}
          height={200}
        />
        <h1 className='font-extrabold text-5xl leading-[90%]'>
          We are <span className='text-primary-400'>glad</span> to see you{' '}
          <span className='text-primary-400'>again!</span>
        </h1>
        <p className='leading-7'>
          Improve your focus and become better version of yourself{' '}
          <span className='text-primary-500'>EVERY DAY</span>.
        </p>
      </div>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
