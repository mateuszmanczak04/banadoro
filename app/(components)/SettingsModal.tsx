import React, { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  getBreakTime,
  getSessionTime,
  setBreakTime as setStoreBreakTime,
  setSessionTime as setStoreSessionTime,
} from '../../redux/timer';

type Props = {
  close: () => void;
};

const SettingsModal = ({ close }: Props) => {
  // redux, global time in seconds
  const dispatch = useAppDispatch();
  const storeSessionTime = useAppSelector(getSessionTime);
  const storeBreakTime = useAppSelector(getBreakTime);

  // local time just for settings in minutes
  const [sessionTime, setSessionTime] = useState<string>(
    (storeSessionTime / 60).toString()
  );
  const [breakTime, setBreakTime] = useState<string>(
    (storeBreakTime / 60).toString()
  );

  // escape detection
  useEffect(() => {
    const closeListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    window.addEventListener('keydown', closeListener);
    return () => window.removeEventListener('keydown', closeListener);
  }, [close]);

  const handleSave = () => {
    dispatch(setStoreSessionTime(parseInt(sessionTime) * 60));
    dispatch(setStoreBreakTime(parseInt(breakTime) * 60));
    close();
  };

  return (
    <div className='fixed w-screen h-screen z-50 left-0 top-0'>
      {/* backdrop */}
      <div
        className='w-full h-full bg-black bg-opacity-70'
        onClick={close}></div>
      {/* content */}
      <div className='bg-white rounded absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-8 flex flex-col gap-4 items-center w-10/12 max-w-sm'>
        <div className='w-full flex justify-end'>
          <GrClose
            className='w-6 h-6 cursor-pointer hover:scale-110'
            onClick={close}
          />
        </div>
        <h2 className='text-3xl font-bold'>Settings</h2>
        <div className='flex gap-2 w-full items-center border p-4 rounded'>
          <p className='w-16 flex-1'>Session duration</p>
          <input
            className='bg-gray-100 px-4 py-2 rounded outline-none w-16 text-center border'
            type='number'
            onChange={(e) => setSessionTime(e.target.value)}
            value={sessionTime}
          />
        </div>
        <div className='flex gap-2 w-full items-center border p-4 rounded'>
          <p className='w-16 flex-1'>Break duration</p>
          <input
            className='bg-gray-100 px-4 py-2 rounded outline-none w-16 text-center border'
            type='number'
            onChange={(e) => setBreakTime(e.target.value)}
            value={breakTime}
          />
        </div>
        <button className='btn' onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
