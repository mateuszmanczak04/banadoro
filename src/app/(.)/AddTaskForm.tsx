'use client';

import useTasksContext from '@/hooks/useTasksContext';
import { FormEvent, useState } from 'react';
import { Button } from '../(common)/Button';
import Input from '../(common)/Input';

export const AddTaskForm = () => {
  const { createTask } = useTasksContext();

  const [title, setTitle] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title) return;
    createTask({ title });
    setTitle('');
  };

  return (
    <form
      className='flex flex-col gap-2 items-center w-full p-4 rounded-md bg-gray-800'
      onSubmit={handleSubmit}>
      <h2 className='text-3xl font-bold mb-1'>Add Task</h2>
      <Input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button className='w-full'>Add</Button>
    </form>
  );
};
