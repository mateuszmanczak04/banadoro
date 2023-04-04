import React, { useCallback, useEffect, useState } from 'react';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { useAppSelector } from '../../redux/store';
import { Day, getPreviousDays } from '../../redux/timer';
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';
import { getDateSlug } from '../../lib/getDateSlug';

const WeekOverview = () => {
  const [currentDate, setCurrentDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [days, setDays] = useState<Date[]>([]);
  const [maxTotalTime, setMaxTotalTime] = useState(10);
  const windowWidth = useWindowWidth();

  // redux
  const previousDays = useAppSelector(getPreviousDays);

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
          {windowWidth >= 1024 ? (
            <ArrowLeftIcon className='h-8 w-8 text-gray-500' />
          ) : (
            <ArrowDownIcon className='h-8 w-8 text-gray-500' />
          )}
        </button>
        {
          <button
            className='cursor-pointer hover:scale-105 transition'
            onClick={handleDateAhead}>
            {windowWidth >= 1024 ? (
              <ArrowRightIcon className='h-8 w-8 text-gray-500' />
            ) : (
              <ArrowUpIcon className='h-8 w-8 text-gray-500' />
            )}
          </button>
        }
      </div>
      <div className='flex flex-col gap-2 w-full rounded-lg lg:flex-row-reverse lg:h-64'>
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
              className='flex flex-col gap-4 bg-gray-100 border-2 border-gray-200 border-opacity-50 p-2 rounded w-full dark:bg-gray-800 dark:border-gray-700'>
              <div className='flex gap-4 justify-between lg:flex-col items-center'>
                <p>{getDateSlug(day)}</p>
                {totalTime > 0 && <p>{totalTime} minutes</p>}
                {totalTime === 0 && <p className='text-gray-500'>Lazy day</p>}
              </div>

              <div className='w-full h-full relative'>
                <div
                  className='app-gradient rounded h-2 lg:w-full absolute bottom-0 transition duration-1000'
                  style={{
                    width:
                      windowWidth >= 1024
                        ? '100%'
                        : (totalTime / maxTotalTime) * 100 + '%',
                    height:
                      windowWidth >= 1024
                        ? (totalTime / maxTotalTime) * 100 + '%'
                        : '8px',
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
