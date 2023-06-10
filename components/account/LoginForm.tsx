'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useAppDispatch } from '@/redux/store';
import { fetchAllUserDays } from '@/redux/timer';
import { uploadLocalTasks } from '@/redux/tasks';
import Loading from '@/components/Loading';
import LoginWithGoogle from '@/components/account/LoginWithGoogle';

type Props = {
  setAuthenticationStatus: any;
};

const LoginForm = ({ setAuthenticationStatus }: Props) => {
  // redux
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result!.error) {
      setError(result!.error);
      setLoading(false);
      return;
    }

    await dispatch(uploadLocalTasks(email));
    await dispatch(fetchAllUserDays());
    setLoading(false);
    close();
  };

  return (
    <form
      className='flex flex-col gap-4 w-full items-center max-w-md'
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
      <button className='btn'>Login</button>
      <LoginWithGoogle text='Sign In With Google' />
      <p
        className='text-gray-500 cursor-pointer'
        onClick={() => setAuthenticationStatus('register')}>
        Register instead
      </p>
      {error && <p className='error'>{error}</p>}
      {loading && <Loading />}
    </form>
  );
};

export default LoginForm;
