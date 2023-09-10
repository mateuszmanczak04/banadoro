'use client';

import WeekOverview from '@/app/account/WeekOverview';
import { useAppSelector } from '@/redux/store';
import { getTodayTime, getTotalTime } from '@/redux/timer';

const TotalTime = () => {
  // redux
  const todayTime = useAppSelector(getTodayTime);
  const totalTime = useAppSelector(getTotalTime);

  return (
    <div className='flex flex-col items-center gap-2 w-full'>
      <h2>Total Time: {totalTime} minutes</h2>
      <h2>Today Time: {todayTime} minutes</h2>
      <WeekOverview />
    </div>
  );
};

export default TotalTime;
