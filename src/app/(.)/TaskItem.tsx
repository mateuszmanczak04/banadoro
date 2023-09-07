'use client';

import { useSession } from 'next-auth/react';
import { useAppDispatch } from '@/redux/store';
import { deleteTask, toggleTask } from '@/redux/tasks';

type Props = {
  title: string;
  checked: boolean;
  _id: string;
};

const TaskItem = ({ title, checked, _id }: Props) => {
  // redux
  const dispatch = useAppDispatch();

  // session
  const { data: session } = useSession();

  const handleToggle = () => {
    dispatch(toggleTask({ _id, authorEmail: session?.user?.email }));
  };

  const handleDelete = () => {
    dispatch(deleteTask(_id));
  };

  return (
    <div
      className={`flex justify-between w-full py-2 px-4 bg-gray-800 text-gray-200 rounded items-center relative gap-2 task-display-animation`}>
      <p
        className={`flex-1 break-all transition ${checked && 'text-gray-700'}`}>
        {title}
      </p>
      <div className='flex gap-2 items-center'>
        {!checked ? (
          <button className='btn-primary' onClick={handleToggle}>
            Mark as done
          </button>
        ) : (
          <button className='btn-secondary' onClick={handleToggle}>
            Undo
          </button>
        )}
        <svg
          className='w-6 h-6 hover:scale-110 transition cursor-pointer '
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
          onClick={handleDelete}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'></path>
        </svg>
      </div>
    </div>
  );
};

export default TaskItem;
