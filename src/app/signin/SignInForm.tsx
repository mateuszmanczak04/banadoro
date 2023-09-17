'use client';

import useTimerContext from '@/hooks/useTimerContext';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { Button } from '../(common)/Button';
import GoogleButton from '../(common)/GoogleButton';
import Loading from '../(common)/Loading';
import Input from '../(common)/Input';

const SignInForm = () => {
  const { fetchAllUserDays } = useTimerContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });

    await new Promise((resolve) => setTimeout(() => resolve('good'), 3000));

    if (result!.error) {
      setError(result!.error);
      setLoading(false);
      return;
    }

    await fetchAllUserDays();
    setLoading(false);
  };

  return (
    <form
      className='flex flex-col gap-6 w-full items-center sm:bg-gray-800 p-8 rounded-lg'
      onSubmit={handleSubmit}>
      <h1 className='text-3xl font-bold'>Sign In</h1>
      <label className='w-full flex flex-col gap-1'>
        <p>E-mail</p>
        <Input
          placeholder='example@abc.com'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className='w-full flex flex-col gap-1'>
        <p>Password</p>
        <Input
          placeholder='SomePassword123#'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <div className='w-full flex flex-col xs:flex-row gap-y-2 xs:gap-x-2 mt-4'>
        <Button variant='primary' className='w-full'>
          Sign In
        </Button>
        <GoogleButton text='Sign In With Google' />
      </div>
      <Link
        href='/signup'
        className='cursor-pointer flex items-center gap-1 text-gray-400 mx-auto'>
        <p>{"Don't have an account? Sign up here"}</p>
      </Link>
      {error && <p className='error'>{error}</p>}
      {loading && <Loading />}
    </form>
  );
};

export default SignInForm;
