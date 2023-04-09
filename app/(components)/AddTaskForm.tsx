import React, { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { addTask } from '../../redux/tasks';
import { useSession } from 'next-auth/react';

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
      className='flex flex-col gap-2 items-center w-full max-w-sm bg-primary-100 p-2 rounded-xl border-2 border-primary-500  dark:border-0 dark:bg-transparent'
      onSubmit={handleSubmit}>
      <h2 className='text-3xl font-bold'>Add Task</h2>
      <input
        type='text'
        className='input-text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className='btn w-full p-2 rounded'>Add</button>
    </form>
  );
};
