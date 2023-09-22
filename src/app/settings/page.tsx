import { getAuthSession } from '@/lib/auth';
import AccountSettings from './AccountSettings';
import TimerSettings from './TimerSettings';

const page = async () => {
  const session = await getAuthSession();

  return (
    <div className='mt-28 w-11/12 max-w-xl mx-auto flex flex-col items-center gap-12'>
      <TimerSettings />
      {session && <AccountSettings />}
    </div>
  );
};

export default page;
