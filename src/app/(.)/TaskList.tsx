'use client';

import useTasksContext from '@/hooks/useTasksContext';
import Loading from '../loading';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks, error, isLoading } = useTasksContext();

  return (
    <div className='md:flex-1 flex flex-col items-center gap-2 p-4 w-full bg-gray-800 max-h-[400px] rounded-md md:h-96'>
      <h2 className='text-3xl font-bold mb-1'>Tasks</h2>
      <div className='flex flex-col items-center gap-2 w-full flex-1 overflow-y-scroll scrollbar-none'>
        {tasks.map((task: Task) => (
          <TaskItem
            key={task._id}
            title={task.title}
            checked={task.checked}
            _id={task._id}
          />
        ))}
        {tasks.length === 0 && (
          <p className='text-center opacity-75'>
            There are no tasks, you can create one right now!
          </p>
        )}
        {isLoading && <Loading />}
        {error && <p className='text-red-500'>{error}</p>}
      </div>
    </div>
  );
};

export default TaskList;
