import AccountSettings from './AccountSettings';
import TimerSettings from './TimerSettings';

const page = async () => {
  return (
    <div className='mt-28 w-11/12 max-w-xl mx-auto flex flex-col items-center gap-12'>
      <TimerSettings />
      <AccountSettings />
    </div>
  );
};

export default page;
