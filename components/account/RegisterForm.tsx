'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useAppDispatch } from '@/redux/store';
import { fetchAllUserDays } from '@/redux/timer';
import { fetchAllUserTasks, uploadLocalTasks } from '@/redux/tasks';
import appAxios from '@/lib/appAxios';
import Loading from '@/components/Loading';
import LoginWithGoogle from '@/components/account/LoginWithGoogle';

type Props = {
  setAuthenticationStatus: any;
};

const RegisterForm = ({ setAuthenticationStatus }: Props) => {
  // redux
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    appAxios
      .post('/api/auth/register', {
        email,
        username,
        password,
      })
      .then(async (response) => {
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
        await dispatch(fetchAllUserTasks(email));
        await dispatch(fetchAllUserDays());
        setLoading(false);
        close();
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
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
        <p>Username</p>
        <input
          type='text'
          className='input-text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      <label className='w-full'>
        <p>Confirm Password</p>
        <input
          type='password'
          className='input-text'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <button className='btn'>Register</button>
      <LoginWithGoogle text='Sign Up With Google' />
      <p
        className='text-gray-500 cursor-pointer'
        onClick={() => setAuthenticationStatus('login')}>
        Login instead
      </p>
      {error && <p className='error'>{error}</p>}
      {loading && <Loading />}
    </form>
  );
};

export default RegisterForm;
