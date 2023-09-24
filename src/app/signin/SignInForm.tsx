'use client';

import useTimerContext from '@/hooks/useTimerContext';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { Button } from '../(common)/Button';
import GoogleButton from '../(common)/GoogleButton';
import Loading from '../(common)/Loading';
import Input from '../(common)/Input';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignInForm = () => {
  const { fetchAllUserDays } = useTimerContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [passwordHint, setPasswordHint] = useState('');
  const [isPasswordHintLoading, setIsPasswordHintLoading] = useState(false);
  const [passwordHintError, setPasswordHintError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        callbackUrl: '/',
        redirect: false,
      });

      if (result!.error) {
        setError(result!.error);
        setLoading(false);
        return;
      }

      await fetchAllUserDays();
      router.push('/');
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetHint = async () => {
    if (email.trim() === '') return;
    setPasswordHintError('');
    setIsPasswordHintLoading(true);
    try {
      const res = await axios.get('/api/auth/password-hint?email=' + email);
      if (res.data.hint === '') {
        setPasswordHint('No hint found');
      } else {
        setPasswordHint(res.data.hint);
      }
    } catch (error: any) {
      setPasswordHintError(error.response.data.message);
    } finally {
      setIsPasswordHintLoading(false);
    }
  };

  return (
    <form
      className='flex flex-col gap-4 w-full my-auto lg:max-h-[80vh] mx-auto lg:mr-4 xs:px-4 xs:py-12 xs:max-w-lg items-center rounded-lg overflow-y-scroll scrollbar-none'
      onSubmit={handleSubmit}>
      <h1 className='text-3xl font-bold'>Sign In</h1>
      <label className='w-full flex flex-col gap-1'>
        <p>E-mail</p>
        <Input
          placeholder='example@abc.com'
          type='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setPasswordHint('');
          }}
        />
      </label>
      <div className='w-full flex flex-col gap-1'>
        <div className='flex gap-2'>
          <label htmlFor='password'>Password</label>{' '}
          <Link
            href='/forgot-password'
            className='cursor-pointer text-gray-400 hover:text-gray-300 transition'>
            <p>Forgot?</p>
          </Link>
        </div>
        <div>
          {isPasswordHintLoading && <Loading />}
          {passwordHintError && <p className='error'>{passwordHintError}</p>}
          {passwordHint && (
            <p>
              Your password hint:{' '}
              <span className='text-gray-400'>{passwordHint}</span>
            </p>
          )}
        </div>
        <div className='w-full flex items-center gap-2 mt-1'>
          <Input
            id='password'
            placeholder='SomePassword123#'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!passwordHint && !isPasswordHintLoading && email && (
            <Button
              variant='secondary'
              className='text-sm px-2 shrink-0 self-stretch'
              onClick={handleGetHint}
              type='button'>
              Get Hint
            </Button>
          )}
        </div>
      </div>
      <div className='w-full flex flex-col sm:flex-row gap-2 mt-4'>
        <Button
          variant='primary'
          className='w-full'
          disabled={!email || !password}
          type='submit'>
          Sign In
        </Button>
        <GoogleButton text='Sign In With Google' />
      </div>
      <Link
        href='/signup'
        className='cursor-pointer text-gray-400 hover:text-gray-300 transition mx-auto text-center'>
        <p>{"Don't have an account yet? Sign up here"}</p>
      </Link>
      {error && <p className='error'>{error}</p>}
      {loading && <Loading />}
    </form>
  );
};

export default SignInForm;
