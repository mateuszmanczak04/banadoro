import React from 'react';
import { AiOutlineCheckSquare, AiFillCheckSquare } from 'react-icons/ai';
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
      className={`flex justify-between w-full py-2 px-4 ${
        checked ? 'bg-gray-300 text-gray-600' : 'bg-gray-100 text-gray-800'
      } rounded cursor-pointer items-center relative hover:bg-gray-200 gap-2`}
      onClick={handleToggle}>
      <p className='flex-1 break-all'>{title}</p>
      {checked ? (
        <AiFillCheckSquare className='w-6 h-6' />
      ) : (
        <AiOutlineCheckSquare className='w-6 h-6' />
      )}
    </div>
  );
};

export default TaskItem;
