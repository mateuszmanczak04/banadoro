import React from 'react';
import { useAppSelector } from '../../redux/store';
import { getTodayTime, getTotalTime } from '../../redux/timer';

const TotalTime = () => {
  // redux
  const todayTime = useAppSelector(getTodayTime);
  const totalTime = useAppSelector(getTotalTime);

  return (
    <div>
      <h2>Total Time: {totalTime} minutes</h2>
      <h2>Today Time: {todayTime} minutes</h2>
    </div>
  );
};

export default TotalTime;
