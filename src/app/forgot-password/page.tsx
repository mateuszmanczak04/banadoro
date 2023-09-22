'use client';

import axios from 'axios';
import { FormEvent, useState } from 'react';
import { Button } from '../(common)/Button';
import Input from '../(common)/Input';
import Loading from '../loading';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await axios.post('/api/auth/forgot-password', {
        email: email.trim(),
      });
      setDone(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='pt-20 sm:pt-24 w-full'>
      <form
        className='w-11/12 max-w-lg mx-auto bg-gray-800 rounded-md flex flex-col items-center gap-4 p-4 text-center'
        onSubmit={handleSubmit}>
        <h2 className='text-3xl font-extrabold'>Forgot Your Password?</h2>
        <p className='shrink-0'>Enter your e-mail here:</p>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='example@example.com'
        />
        <Button className='w-full' disabled={isLoading}>
          Send Reset Link
        </Button>
        {isLoading && <Loading />}
        {error && <p className='error'>{error}</p>}
        {done && (
          <p className='opacity-75'>
            An email has been sent. Check your inbox.
          </p>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;