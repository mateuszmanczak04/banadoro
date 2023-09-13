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
import { v4 as uuid } from 'uuid';

interface TasksContextProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  isLoading: boolean;
  error: string;
  addTask: ({ title }: { title: string }) => void | Promise<void>;
  toggleTask: ({ taskId }: { taskId: string }) => void | Promise<void>;
  fetchAllUserTasks: () => void | Promise<void>;
  deleteTask: ({ taskId }: { taskId: string }) => void | Promise<void>;
}

const initialValue: TasksContextProps = {
  tasks: [],
  setTasks: () => {},
  isLoading: false,
  error: '',
  addTask: () => {},
  toggleTask: () => {},
  fetchAllUserTasks: () => {},
  deleteTask: () => {},
};
export const TasksContext = createContext<TasksContextProps>(initialValue);

export const TasksContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>(initialValue.tasks);
  const [isLoading, setIsLoading] = useState<boolean>(initialValue.isLoading);
  const [error, setError] = useState<string>(initialValue.error);

  const addTask = async ({ title }: { title: string }) => {
    const _id = uuid();
    if (!session?.user.email) {
      const newTask = { title, checked: false, _id };
      setTasks((prev) => [...prev, newTask]);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await axios.post('/api/tasks/add-task', {
        title,
        authorEmail: session.user.email,
        _id,
      });
      const newTask = { title, checked: false, _id };
      setTasks((prev) => [...prev, newTask]);
    } catch {
      setError('Could not add task.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTask = async ({ taskId }: { taskId: string }) => {
    if (!session?.user) {
      setTasks((prev) =>
        prev.map((task) => {
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
      await axios.put('/api/tasks/toggle-task', { _id: taskId });
      setTasks((prev) =>
        prev.map((task) => {
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
      const res = await axios.get('/api/tasks/get-all-user-tasks');
      setTasks(res.data.tasks);
    } catch {
      setError('Could not fetch tasks.');
    } finally {
      setIsLoading(false);
    }
  }, [session?.user]);

  const deleteTask = async ({ taskId }: { taskId: string }) => {
    if (!session?.user) {
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await axios.delete('/api/tasks/delete-task/' + taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
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
        addTask,
        toggleTask,
        fetchAllUserTasks,
        deleteTask,
      }}>
      {children}
    </TasksContext.Provider>
  );
};