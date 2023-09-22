'use client';

import useTimerContext from '@/hooks/useTimerContext';
import { getDateSlug } from '@/lib/getDateSlug';
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';
import { useCallback, useEffect, useState } from 'react';

const WeekOverview = () => {
  const [currentDate, setCurrentDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [days, setDays] = useState<Date[]>([]);
  const [maxTotalTime, setMaxTotalTime] = useState(10);

  const { previousDays } = useTimerContext();

  const handleDateAhead = () => {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    if (currentDate.getTime() === today.getTime()) {
      return;
    }
    const newDate = currentDate;
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
    updateDays();
  };

  const handleDateBack = () => {
    const newDate = currentDate;
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
    updateDays();
  };

  const updateDays = useCallback(() => {
    let newDays = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date(currentDate);
      d.setDate(d.getDate() - i);
      newDays.push(d);
    }
    setDays(newDays);
  }, [currentDate]);

  useEffect(() => {
    let newMaxTotalTime = 60;
    previousDays.forEach((day: Day) => {
      if (day.totalTime > newMaxTotalTime) {
        newMaxTotalTime = day.totalTime;
      }
    });
    setMaxTotalTime(newMaxTotalTime);
    updateDays();
  }, [previousDays, updateDays]);

  return (
    <div className='flex w-full flex-col items-center gap-2'>
      <div className='flex gap-4'>
        <button
          className='cursor-pointer hover:scale-105 transition'
          onClick={handleDateBack}>
          <ArrowLeftIcon className='h-8 w-8 text-gray-500 hidden md:block' />
          <ArrowDownIcon className='h-8 w-8 text-gray-500 block md:hidden' />
        </button>
        {
          <button
            className='cursor-pointer hover:scale-105 transition'
            onClick={handleDateAhead}>
            <ArrowRightIcon className='h-8 w-8 text-gray-500 hidden md:block' />
            <ArrowUpIcon className='h-8 w-8 text-gray-500 block md:hidden' />
          </button>
        }
      </div>
      <div className='flex flex-col gap-2 w-full rounded-lg md:flex-row-reverse md:h-64'>
        {days.map((day: Date) => {
          const workDay = previousDays.find(
            (d: Day) => d.date === getDateSlug(day)
          );
          let totalTime = 0;
          if (workDay) {
            totalTime = workDay.totalTime;
          }

          return (
            <div
              key={getDateSlug(day)}
              className='flex flex-col gap-4 border-2  border-opacity-50 p-2 rounded w-full bg-gray-800 border-gray-700'>
              <div className='flex gap-4 justify-between md:flex-col items-center'>
                <p>{getDateSlug(day)}</p>
                {totalTime > 0 && (
                  <p>
                    {totalTime} {totalTime === 1 ? 'minute' : 'minutes'}
                  </p>
                )}
                {totalTime === 0 && <p className='text-gray-500'>Lazy day</p>}
              </div>

              <div className='w-full h-full relative'>
                <div
                  className='app-gradient rounded h-2 md:w-full absolute bottom-0 transition duration-1000 hidden md:block'
                  style={{
                    width: '100%',
                    height: (totalTime / maxTotalTime) * 100 + '%',
                  }}></div>
                <div
                  className='app-gradient rounded h-2 md:w-full absolute bottom-0 transition duration-1000 block md:hidden'
                  style={{
                    width: (totalTime / maxTotalTime) * 100 + '%',
                    height: '8px',
                  }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekOverview;
