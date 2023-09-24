'use client';

import useSettingsContext from '@/hooks/useSettingsContext';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { Button } from '../(common)/Button';
import Input from '../(common)/Input';
import Loading from '../loading';

const PasswordHint = () => {
  const { data: session } = useSession();
  const {
    handleSetPasswordHint,
    passwordHintError: error,
    passwordHint,
    isPasswordHintLoading: isLoading,
    isPasswordHintDone: done,
  } = useSettingsContext();
  const [newHint, setNewHint] = useState(passwordHint);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSetPasswordHint(newHint);
  };

  if (!session) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full flex flex-col gap-2 bg-gray-800 p-4 rounded-md'>
      <label
        htmlFor='password-hint'
        className='cursor-pointer flex items-center gap-2'>
        Password Hint
      </label>
      <div className='flex flex-col xs:flex-row gap-2'>
        <Input
          type='text'
          id='password-hint'
          className='self-stretch'
          value={newHint}
          onChange={(e) => setNewHint(e.target.value)}
        />
        <Button
          variant='primary'
          type='submit'
          className='self-stretch'
          disabled={isLoading}>
          Update
        </Button>
      </div>
      <small className='opacity-75'>
        Leaving it empty will disable this option.
      </small>
      {isLoading && <Loading />}
      {error && <p className='error'>{error}</p>}
      {done && <p className='opacity-75'>Password hint updated.</p>}
    </form>
  );
};

export default PasswordHint;
