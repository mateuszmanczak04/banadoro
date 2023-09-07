'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useAppDispatch } from '@/redux/store';
import { fetchAllUserDays } from '@/redux/timer';
import Loading from '../(common)/Loading';
import GoogleButton from '../(common)/GoogleButton';
import Link from 'next/link';
import PasswordInput from '../(common)/PasswordInput';

const SignInForm = () => {
  // redux
  const dispatch = useAppDispatch();

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

    await dispatch(fetchAllUserDays());
    setLoading(false);
  };

  return (
    <form
      className='flex flex-col gap-6 w-full items-center sm:bg-gray-800 p-8 rounded-lg'
      onSubmit={handleSubmit}>
      <h1 className='text-3xl font-bold'>Login</h1>
      <label className='w-full flex flex-col gap-1'>
        <p>E-mail</p>
        <input
          placeholder='example@abc.com'
          type='email'
          className='input-text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className='w-full flex flex-col gap-1'>
        <p>Password</p>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <div className='w-full flex flex-col xs:flex-row gap-y-2 xs:gap-x-2 mt-4'>
        <button className='btn-primary w-full'>Login</button>
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
