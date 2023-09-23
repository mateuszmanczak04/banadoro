import useLocalStorage from '@/hooks/useLocalStorage';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface TasksContextProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  isLoading: boolean;
  error: string;
  createTask: ({ title }: { title: string }) => void | Promise<void>;
  toggleTask: ({ taskId }: { taskId: string }) => void | Promise<void>;
  fetchAllUserTasks: () => void | Promise<void>;
  deleteTask: ({ taskId }: { taskId: string }) => void | Promise<void>;
}

const initialState: TasksContextProps = {
  tasks: [],
  setTasks: () => {},
  isLoading: false,
  error: '',
  createTask: () => {},
  toggleTask: () => {},
  fetchAllUserTasks: () => {},
  deleteTask: () => {},
};
export const TasksContext = createContext<TasksContextProps>(initialState);

export const TasksContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    'tasks',
    initialState.tasks
  );
  const [isLoading, setIsLoading] = useState<boolean>(initialState.isLoading);
  const [error, setError] = useState<string>(initialState.error);

  const createTask = async ({ title }: { title: string }) => {
    // offline
    if (!session?.user?.email) {
      const newTask = { title, checked: false, _id: Math.random().toString() };
      setTasks([...tasks, newTask]);
      return;
    }

    setError('');
    setIsLoading(true);

    // online
    try {
      const res = await axios.post('/api/tasks', {
        title,
      });
      const newTask = res.data.task;
      setTasks([...tasks, newTask]);
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTask = async ({ taskId }: { taskId: string }) => {
    if (!session?.user) {
      setTasks(
        tasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, checked: !task.checked };
          }
          return task;
        })
      );
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await axios.put('/api/tasks', { _id: taskId });
      setTasks(
        tasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, checked: !task.checked };
          }
          return task;
        })
      );
    } catch {
      setError('Could not toggle task.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllUserTasks = useCallback(async () => {
    if (!session?.user) return;

    setIsLoading(true);
    setError('');

    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data.tasks);
    } catch {
      setError('Could not fetch tasks.');
    } finally {
      setIsLoading(false);
    }
  }, [session?.user, setTasks]);

  const deleteTask = async ({ taskId }: { taskId: string }) => {
    if (!session?.user) {
      setTasks(tasks.filter((task) => task._id !== taskId));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await axios.delete('/api/tasks?_id=' + taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch {
      setError('Could not delete a task.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUserTasks();
  }, [fetchAllUserTasks]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        isLoading,
        error,
        createTask,
        toggleTask,
        fetchAllUserTasks,
        deleteTask,
      }}>
      {children}
    </TasksContext.Provider>
  );
};
