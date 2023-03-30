import React, { FormEvent, useState } from 'react';
import appAxios from '../../lib/appAxios';
import { signIn } from 'next-auth/react';
import { useAppDispatch } from '../../redux/store';
import { fetchAllUserTasks, uploadLocalTasks } from '../../redux/tasks';
import Loading from './Loading';

type Props = {
  setAuthenticationStatus: any;
  close: () => void;
};

const RegisterForm = ({ setAuthenticationStatus, close }: Props) => {
  // redux
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
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
      className='flex flex-col gap-4 w-full items-center'
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
