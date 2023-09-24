'use client';

import axios from 'axios';
import { FormEvent, useState } from 'react';
import { Button } from '../(common)/Button';
import Input from '../(common)/Input';
import Loading from '../loading';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;
    setIsLoading(true);
    setError('');
    setDone(false);
    try {
      await axios.put('/api/auth/change-password', {
        password: newPassword,
      });
      setDone(true);
      setNewPassword('');
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full flex flex-col gap-2 bg-gray-800 p-4 rounded-md'>
      <label htmlFor='newPassword' className='cursor-pointer'>
        Change Password
      </label>
      <div className='flex flex-col xs:flex-row gap-2'>
        <Input
          type='password'
          id='newPassword'
          autoComplete='new-password'
          className='self-stretch'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value.trim())}
        />
        <Button
          variant='primary'
          type='submit'
          className='self-stretch'
          disabled={isLoading || !newPassword}>
          Change
        </Button>
      </div>
      {isLoading && <Loading />}
      {error && <p className='error'>{error}</p>}
      {done && <p className='opacity-75'>Password changed.</p>}
    </form>
  );
};

export default ChangePassword;
