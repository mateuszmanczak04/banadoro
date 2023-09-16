'use client';

import useTasksContext from '@/hooks/useTasksContext';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks } = useTasksContext();

  return (
    <div className='flex flex-col items-center gap-2 w-full mt-2'>
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
