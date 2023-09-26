'use client';

import axios from 'axios';
import { FormEvent, useState } from 'react';
import { Button } from '../(common)/Button';
import Input from '../(common)/Input';
import Loading from '../loading';

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;
    setLoading(true);
    setError('');
    setDone(false);
    try {
      await axios.put('/api/auth/change-password', {
        password: newPassword,
      });
      setDone(true);
      setNewPassword('');
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
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
          disabled={loading || !newPassword}>
          Update
        </Button>
      </div>
      {loading && <Loading />}
      {error && <p className='error'>{error}</p>}
      {done && <p className='opacity-75'>Password updated.</p>}
    </form>
  );
};

export default UpdatePassword;
