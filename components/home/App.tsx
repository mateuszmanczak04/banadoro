import ClockFrame from '@/components/home/ClockFrame';
import TaskList from '@/components/home/TaskList';
import { AddTaskForm } from '@/components/home/AddTaskForm';

const App = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col items-center md:items-start gap-8 mb-8 pt-20 md:flex-row w-screen max-w-10/12 p-8 justify-center min-h-screen'>
        <div className='w-full max-w-sm flex flex-col gap-8'>
          <ClockFrame />
          <AddTaskForm />
        </div>
        <div className='w-full max-w-sm'>
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default App;
