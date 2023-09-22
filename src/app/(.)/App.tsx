import { AddTaskForm } from '@/app/(.)/AddTaskForm';
import ClockFrame from './ClockFrame';
import InspirationQuotes from './InspirationQuotes';
import TaskList from './TaskList';

const App = () => {
  return (
    <div className='flex flex-col items-center gap-4 w-full md:w-11/12 max-w-4xl mx-auto pt-20 md:pt-24 pb-4'>
      <ClockFrame />
      <div className='w-full flex flex-col md:flex-row gap-4'>
        <div className='flex-1 flex flex-col gap-4 h-96'>
          <AddTaskForm />
          <InspirationQuotes />
        </div>
        <TaskList />
      </div>
    </div>
  );
};

export default App;
