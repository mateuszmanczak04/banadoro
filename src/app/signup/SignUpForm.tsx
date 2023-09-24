'use client';

import useTimerContext from '@/hooks/useTimerContext';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { Button } from '../(common)/Button';
import GoogleButton from '../(common)/GoogleButton';
import Loading from '../(common)/Loading';
import Input from '../(common)/Input';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // create an account
      await axios.post('/api/auth/signup', {
        email,
        username,
        password,
      });

      // login to the account
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/',
        redirect: false,
      });

      await fetchAllUserDays();
      router.push('/');
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
      className='flex flex-col gap-4 w-full my-auto mx-auto max-w-md items-center rounded-lg'
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
      <div className='w-full flex flex-col gap-4'>
        <div className='w-full flex flex-col xs:flex-row gap-y-4 gap-x-2'>
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
      <div className='w-full flex flex-col xs:flex-row gap-2 mt-4'>
        <Button
          variant='primary'
          className='w-full'
          disabled={!email || !username || !password}>
          Sign Up
        </Button>
        <GoogleButton text='Sign Up With Google' />
      </div>
      <Link
        href='/signin'
        className='cursor-pointer flex gap-1 text-gray-400 mx-auto text-center'>
        <p>Already have an account? Sign in here</p>
      </Link>

      {error && <p className='error'>{error}</p>}
      {loading && <Loading />}
    </form>
  );
};

export default SignUpForm;
