'use client';

import React, { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useAppDispatch } from '@/redux/store';
import { fetchAllUserDays } from '@/redux/timer';
import appAxios from '@/lib/appAxios';
import Loading from '../(common)/Loading';
import GoogleButton from '../(common)/GoogleButton';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import PasswordInput from '../(common)/PasswordInput';
import { Button } from '../(common)/Button';

const SignUpForm = () => {
  // redux
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAtLeast6Characters, setPasswordAtLeast6Characters] =
    useState(false);
  const [strongPassword, setStrongPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    appAxios
      .post('/api/auth/signup', {
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

  const handleTypePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (e.target.value.length >= 6) {
      setPasswordAtLeast6Characters(true);
    } else {
      setPasswordAtLeast6Characters(false);
    }

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-=_+[\]{}|;':",.<>/?]).*$/;

    if (regex.test(e.target.value)) {
      setStrongPassword(true);
    } else {
      setStrongPassword(false);
    }
  };

  return (
    <form
      className='flex flex-col gap-6 w-full items-center sm:bg-gray-800 p-8 rounded-lg'
      onSubmit={handleSubmit}>
      <h1 className='text-3xl font-bold flex flex-col gap-1'>Register</h1>
      <label className='w-full'>
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
        <p>Username</p>
        <input
          placeholder='John Smith'
          type='text'
          className='input-text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <div className='flex flex-col w-full gap-3'>
        <label className='w-full flex flex-col gap-1'>
          <p>Password</p>
          <PasswordInput value={password} onChange={handleTypePassword} />
        </label>
        <div className='flex flex-col items-start w-full max-w-sm text-sm text-gray-400 gap-2'>
          <div className='flex gap-1 w-full'>
            <InformationCircleIcon
              className={`h-4 w-4 mt-0.5 shrink-0 transition duration-500 ${
                passwordAtLeast6Characters ? 'text-green-500' : 'text-red-500'
              }`}
            />
            <p>Password must be at least 6 characters long</p>
          </div>
          <div className='flex gap-1 w-full'>
            <InformationCircleIcon
              className={`h-4 w-4 mt-0.5 shrink-0 transition duration-500 ${
                strongPassword ? 'text-green-500' : 'text-red-500'
              }`}
            />
            <p>
              It is not obligatory but recommended to use small and capital
              letters combined with special signs
            </p>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col xs:flex-row gap-y-2 xs:gap-x-2 mt-4'>
        <Button variant='primary' className='w-full'>
          Register
        </Button>
        <GoogleButton text='Sign Up With Google' />
      </div>
      <Link
        href='/signin'
        className='cursor-pointer flex items-center gap-1 text-gray-400 mx-auto'>
        <ArrowRightCircleIcon className='h-5 w-5 mt-0.5' />
        <p>Already have an account? Sign in here</p>
      </Link>

      {error && <p className='error'>{error}</p>}
      {loading && <Loading />}
    </form>
  );
};

export default SignUpForm;
