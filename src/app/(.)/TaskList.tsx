'use client';

import useTasksContext from '@/hooks/useTasksContext';
import twClass from '@/lib/twClass';
import Loading from '../loading';
import TaskItem from './TaskItem';

const TaskList = () => {
	const { tasks, error, isLoading } = useTasksContext();

	return (
		<div className='md:flex-1 flex flex-col items-center gap-2 p-4 pb-12 w-full bg-gray-800 max-h-[400px] rounded-md md:h-96 relative overflow-hidden'>
			<h2 className='text-3xl font-bold mb-1'>Tasks</h2>
			<div className='flex flex-col items-center gap-2 w-full flex-1 overflow-y-scroll scrollbar-none'>
				{tasks.map((task: Task) => (
					<TaskItem
						key={task.id}
						title={task.title}
						checked={task.checked}
						id={task.id}
					/>
				))}
				{tasks.length === 0 && (
					<p className='text-center opacity-75'>
						There are no tasks, you can create one right now!
					</p>
				)}
				{isLoading && (
					<p
						className={twClass(
							'text-sm absolute bottom-0 px-2 h-8 leading-8 bg-blue-500 w-full text-center transition',
							error ? 'translate-y-0' : 'translate-y-8',
						)}>
						Loading...
					</p>
				)}
				<p
					className={twClass(
						'text-sm absolute bottom-0 px-2 h-8 leading-8 bg-red-500 w-full text-center transition',
						error ? 'translate-y-0' : 'translate-y-8',
					)}>
					{error}
				</p>
			</div>
		</div>
	);
};

export default TaskList;
