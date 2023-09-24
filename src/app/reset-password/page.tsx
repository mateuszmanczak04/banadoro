'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { Button } from '../(common)/Button';
import Input from '../(common)/Input';
import Loading from '../loading';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    const queryToken = searchParams.get('token') || '';
    if (!queryToken) {
      return router.replace('/');
    } else {
      setToken(queryToken);
    }
  }, [router, searchParams]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await axios.put(
        '/api/auth/reset-password',
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDone(true);
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bottom-menu container'>
      <form
        className='bg-gray-800 rounded-md flex flex-col items-center gap-4 p-4 text-center'
        onSubmit={handleSubmit}>
        <h2 className='text-3xl font-extrabold'>Reset Your Password</h2>
        <p className='shrink-0'>Enter your new password here:</p>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='SuperSecretPassword123'
        />
        <Button className='w-full' disabled={isLoading}>
          Reset Password
        </Button>
        {isLoading && <Loading />}
        {error && <p className='error'>{error}</p>}
        {done && (
          <Link className='opacity-75' href='/signin'>
            Your password has been updated. You can now log in. Click here for
            redirect.
          </Link>
        )}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
