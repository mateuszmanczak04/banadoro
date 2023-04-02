import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { useAppDispatch } from '../../redux/store';
import { setTasks } from '../../redux/tasks';
import TotalTime from './TotalTime';
import { resetTotalTime } from '../../redux/timer';

type Props = {
  close: () => void;
};

const AccountSettings = ({ close }: Props) => {
  // redux
  const dispatch = useAppDispatch();

  // session
  const { data: session } = useSession();

  const handleSignOut = () => {
    dispatch(setTasks([]));
    dispatch(resetTotalTime());
    signOut({ redirect: false });
    close();
  };

  return (
    <div className='flex flex-col items-center gap-4 w-full'>
      <h2 className='bg-gray-700 text-white rounded py-1 px-4'>
        {session?.user?.email}
      </h2>
      <TotalTime />
      <button className='btn' onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
};

export default AccountSettings;
