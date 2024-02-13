import { AddTaskForm } from '@/app/(.)/AddTaskForm';
import OfflineWrapper from '../(common)/OfflineWrapper';
import ClockFrame from './ClockFrame';
import InspirationQuotes from './InspirationQuotes';
import TaskList from './TaskList';

const App = () => {
	return (
		<div className='container flex flex-col items-center gap-4 w-full'>
			<ClockFrame />
			{/* <OfflineWrapper content='Tasks are disabled in offline mode.'> */}
			<div className='w-full flex flex-col md:flex-row gap-4'>
				<div className='flex-1 flex flex-col gap-4 h-96'>
					<AddTaskForm />
					<InspirationQuotes />
				</div>
				<TaskList />
			</div>
			{/* </OfflineWrapper> */}
		</div>
	);
};

export default App;
