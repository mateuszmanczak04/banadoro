'use client';

import { useAppSelector } from '@/redux/store';
import { getTasks } from '@/redux/tasks';
import TaskItem from '@/components/home/TaskItem';

const TaskList = () => {
  // redux
  const tasks = useAppSelector(getTasks);

  return (
    <div className='flex flex-col items-center gap-2 w-full max-w-sm mt-2'>
      <h2 className='text-3xl font-bold'>Tasks</h2>
      {tasks.map((task: Task) => (
        <TaskItem
          key={task._id}
          title={task.title}
          checked={task.checked}
          _id={task._id}
        />
      ))}
    </div>
  );
};

export default TaskList;
