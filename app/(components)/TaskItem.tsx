import React from 'react';
import { useAppDispatch } from '../../redux/store';
import { toggleTask } from '../../redux/tasks';
import { useSession } from 'next-auth/react';

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

  return (
    <div
      className={`flex justify-between w-full py-2 px-4 dark:bg-gray-800 dark:text-gray-200 ${
        checked
          ? 'bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-400 opacity-30'
          : 'bg-gray-100 text-gray-800'
      } rounded cursor-pointer items-center relative hover:bg-gray-200 gap-2 `}
      onClick={handleToggle}>
      <p className='flex-1 break-all'>{title}</p>
      {checked ? (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          strokeWidth='2.5'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4.5 12.75l6 6 9-13.5'></path>
        </svg>
      ) : (
        ''
      )}
    </div>
  );
};

export default TaskItem;
