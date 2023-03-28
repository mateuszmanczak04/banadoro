import React, { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

type Props = {
  setAuthenticationStatus: any;
};

const LoginForm = ({ setAuthenticationStatus }: Props) => {
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

    setAuthenticationStatus('loggedIn');
    setLoading(false);
  };

  return (
    <form
      className='flex flex-col gap-4 w-full items-center'
      onSubmit={handleSubmit}>
      <label className='w-full'>
        <p>E-mail</p>
        <input
          type='email'
          className='bg-gray-100 rounded w-full p-2'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className='w-full'>
        <p>Password</p>
        <input
          type='password'
          className='bg-gray-100 rounded w-full p-2'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className='btn'>Login</button>
      <p
        className='text-gray-500 cursor-pointer'
        onClick={() => setAuthenticationStatus('register')}>
        Register instead
      </p>
      {error && <p className='error'>{error}</p>}
      {loading && <p>Loading...</p>}
    </form>
  );
};

export default LoginForm;
