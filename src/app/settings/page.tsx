import AccountSettings from './AccountSettings';
import TimerSettings from './TimerSettings';

const page = async () => {
  return (
    <div className='bottom-menu container flex flex-col items-center gap-12'>
      <TimerSettings />
      <AccountSettings />
    </div>
  );
};

export default page;
