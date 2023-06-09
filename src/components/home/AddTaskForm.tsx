'use client';

import { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from '@/redux/store';
import { addTask } from '@/redux/tasks';

export const AddTaskForm = () => {
  // redux
  const dispatch = useAppDispatch();

  // session
  const { data: session } = useSession();

  const [title, setTitle] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title) return;

    dispatch(addTask({ title, authorEmail: session?.user?.email }));
    setTitle('');
  };

  return (
    <form
      className='flex flex-col gap-2 items-center w-full max-w-sm p-2 rounded-xl '
      onSubmit={handleSubmit}>
      <h2 className='text-3xl font-bold'>Add Task</h2>
      <input
        type='text'
        className='input-text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className='btn-primary w-full'>Add</button>
    </form>
  );
};
