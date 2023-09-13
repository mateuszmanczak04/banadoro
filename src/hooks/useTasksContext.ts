import { TasksContext } from '@/context/TasksContext';
import { useContext } from 'react';

const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error('useTasksContext must be used within a TasksProvider');
  }

  return context;
};

export default useTasksContext;
