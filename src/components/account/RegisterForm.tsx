'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useAppDispatch } from '@/redux/store';
import { fetchAllUserDays } from '@/redux/timer';
import appAxios from '@/lib/appAxios';
import Loading from '@/components/Loading';
import LoginWithGoogle from '@/components/account/LoginWithGoogle';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  // redux
  const dispatch = useAppDispatch();

  const router = useRouter();

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
      .then(async (_) => {
        const result = await signIn('credentials', {
          email,
          password,
          callbackUrl: '/',
        });

        if (result!.error) {
          setError(result!.error);
          setLoading(false);
          return;
        }

        await dispatch(fetchAllUserDays());
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
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
      <button className='btn-primary w-full'>Register</button>
      <LoginWithGoogle text='Sign Up With Google' />
      <p
        className='text-gray-500 cursor-pointer'
        onClick={() => router.push('/account/login')}>
        Login instead
      </p>
      {error && <p className='error'>{error}</p>}
      {loading && <Loading />}
    </form>
  );
};

export default RegisterForm;
