'use client';

import useTimerContext from '@/hooks/useTimerContext';
import {
  ArrowRightCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { Button } from '../(common)/Button';
import GoogleButton from '../(common)/GoogleButton';
import Loading from '../(common)/Loading';
import Input from '../(common)/Input';

const SignUpForm = () => {
  const { fetchAllUserDays } = useTimerContext();
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

    try {
      await axios.post('/api/auth/signup', {
        email,
        username,
        password,
      });
      try {
        await signIn('credentials', {
          email,
          password,
          callbackUrl: '/',
        });
        await fetchAllUserDays();
      } catch {
        setError('Could not sign in.');
      }
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
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
      className='flex flex-col gap-4 w-11/12 my-auto lg:max-h-[80vh] mx-auto lg:mr-4 xs:px-4 xs:py-12 xs:max-w-lg items-center rounded-lg overflow-y-scroll scrollbar-none'
      onSubmit={handleSubmit}>
      <h1 className='text-3xl font-bold'>Sign Up</h1>
      <label className='w-full flex flex-col gap-1'>
        <p>E-mail</p>
        <Input
          placeholder='example@abc.com'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <div className='w-full flex flex-col sm:flex-row gap-y-4 gap-x-2'>
        <label className='w-full flex flex-col gap-1 flex-1'>
          <p>Username</p>
          <Input
            placeholder='John Smith'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className='w-full flex flex-col gap-1 flex-1'>
          <p>Password</p>
          <Input
            value={password}
            type='password'
            placeholder='SomePassword123#'
            onChange={handleTypePassword}
          />
        </label>
      </div>
      <div className='w-full flex flex-col sm:flex-row gap-2 mt-4'>
        <Button variant='primary' className='w-full'>
          Sign Up
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
