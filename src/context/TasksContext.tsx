import useLocalStorage from '@/hooks/useLocalStorage';
import useOnlineStatusContext from '@/hooks/useOnlineStatusContext';
import axios from 'axios';
import { openDB } from 'idb';
import { useSession } from 'next-auth/react';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TasksContextProps {
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
	isLoading: boolean;
	error: string;
	createTask: ({ title }: { title: string }) => void | Promise<void>;
	toggleTask: ({ taskId }: { taskId: string }) => void | Promise<void>;
	deleteTask: ({ taskId }: { taskId: string }) => void | Promise<void>;
}

const initialState: TasksContextProps = {
	tasks: [],
	setTasks: () => {},
	isLoading: false,
	error: '',
	createTask: () => {},
	toggleTask: () => {},
	deleteTask: () => {},
};
export const TasksContext = createContext<TasksContextProps>(initialState);

export const TasksContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const { data: session } = useSession();
	const [tasks, setTasks] = useLocalStorage<Task[]>(
		'tasks',
		initialState.tasks,
	);
	const [isLoading, setIsLoading] = useState<boolean>(initialState.isLoading);
	const [error, setError] = useState<string>(initialState.error);
	const { online } = useOnlineStatusContext();

	const createTask = async ({ title }: { title: string }) => {
		const newTask: Task = {
			title,
			checked: false,
			id: uuidv4(),
		};

		// unauthenticated
		if (!session?.user?.email) {
			setTasks([...tasks, newTask]);
			return;
		}

		if (!online) {
			// cancel this request if user is offline
			const db = await openDB('banadoro-app', 1);
			const tasksStore = db.createObjectStore('tasks', { keyPath: 'id' });
			await tasksStore
				.put(newTask)
				.then(() => console.log('Task stored successfully!'))
				.catch(error => console.error('Error storing task: ', error));
			return;
		}

		setError('');
		setIsLoading(true);

		// authenticated
		try {
			setTasks([...tasks, newTask]);
			await axios.post('/api/tasks', newTask);
		} catch (error: any) {
			if (error.response) {
				setError(error.response.data.message);
			} else {
				setError('An unknown error occurred.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	const toggleTask = async ({ taskId }: { taskId: string }) => {
		// unauthenticated
		if (!session?.user?.email) {
			setTasks(
				tasks.map(task => {
					if (task.id === taskId) {
						return { ...task, checked: !task.checked };
					}
					return task;
				}),
			);
			return;
		}

		if (!online) {
			// cancel this request if user is offline
			return;
		}

		setError('');
		setIsLoading(true);

		// authenticated
		try {
			setTasks(
				tasks.map(task => {
					if (task.id === taskId) {
						return { ...task, checked: !task.checked };
					}
					return task;
				}),
			);
			await axios.put('/api/tasks', { id: taskId });
		} catch (error: any) {
			if (error.response) {
				setError(error.response.data.message);
			} else {
				setError('An unknown error occurred.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	const deleteTask = async ({ taskId }: { taskId: string }) => {
		// unauthenticated
		if (!session?.user) {
			setTasks(tasks.filter(task => task.id !== taskId));
			return;
		}

		if (!online) {
			// cancel this request if user is offline
			return;
		}

		setIsLoading(true);
		setError('');

		// authenticated
		try {
			setTasks(tasks.filter(task => task.id !== taskId));
			await axios.delete(`/api/tasks?id=${taskId}`);
		} catch (error: any) {
			if (error.response) {
				setError(error.response.data.message);
			} else {
				setError('An unknown error occurred.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const fetchAllUserTasks = async () => {
			// offline
			if (!session?.user) return;

			if (!online) {
				// cancel this request if user is offline
				return;
			}

			setIsLoading(true);
			setError('');

			// online
			try {
				const res = await axios.get('/api/tasks');
				setTasks(res.data.tasks);
			} catch (error: any) {
				if (error.response) {
					setError(error.response.data.message);
				} else {
					setError('An unknown error occurred.');
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchAllUserTasks();
	}, [online, session?.user, setTasks]);

	return (
		<TasksContext.Provider
			value={{
				tasks,
				setTasks,
				isLoading,
				error,
				createTask,
				toggleTask,
				deleteTask,
			}}>
			{children}
		</TasksContext.Provider>
	);
};
