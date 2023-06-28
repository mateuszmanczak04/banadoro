'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useAppDispatch } from '@/redux/store';
import { fetchAllUserDays } from '@/redux/timer';
import Loading from '@/components/Loading';
import LoginWithGoogle from '@/components/account/LoginWithGoogle';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  // redux
  const dispatch = useAppDispatch();

  const router = useRouter();

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
      className='flex flex-col gap-4 w-full items-center bg-gray-800 p-4 rounded-lg'
      onSubmit={handleSubmit}>
      <label className='w-full'>
        <p>E-mail</p>
        <input
          type='email'
          className='input-text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className='w-full'>
        <p>Password</p>
        <input
          type='password'
          className='input-text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className='btn-primary w-full'>Login</button>
      <LoginWithGoogle text='Sign In With Google' />
      <p
        className='text-gray-500 cursor-pointer'
        onClick={() => router.push('/account/register')}>
        Register instead
      </p>
      {error && <p className='error'>{error}</p>}
      {loading && <Loading />}
    </form>
  );
};

export default LoginForm;
