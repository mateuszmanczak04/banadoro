'use client';

import WeekOverview from '@/app/stats/WeekOverview';
import useTimerContext from '@/hooks/useTimerContext';

const TotalTime = () => {
  const { todayTime, totalTime } = useTimerContext();

  return (
    <div className='flex flex-col items-center gap-2 w-full'>
      <h2>Total Time: {totalTime} minutes</h2>
      <h2>Today Time: {todayTime} minutes</h2>
      <WeekOverview />
    </div>
  );
};

export default TotalTime;
