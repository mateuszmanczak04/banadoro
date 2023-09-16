import { AddTaskForm } from '@/app/(.)/AddTaskForm';
import ClockFrame from './ClockFrame';
import TaskList from './TaskList';

const App = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col items-center sm:items-start gap-8 mb-8 sm:flex-row w-screen max-w-4xl mx-auto px-4 sm:justify-center min-h-screen'>
        <div className='w-full flex flex-col gap-8'>
          <ClockFrame />
          <AddTaskForm />
        </div>
        <div className='w-full'>
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default App;
