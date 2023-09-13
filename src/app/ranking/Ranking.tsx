'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../loading';

const Ranking = () => {
  const [topUsers, setTopUsers] = useState<RankingTopUser[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTopUsers = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get('/api/ranking/top-users');
        setTopUsers(res.data);
      } catch {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopUsers();
  }, []);

  return (
    <div className='flex flex-col items-center gap-4 w-full'>
      <div className='flex flex-col gap-2 w-full'>
        {isLoading && <Loading />}
        {error && <p>{error}</p>}
        {topUsers &&
          topUsers.length > 0 &&
          topUsers.map((user: User, index: number) => (
            <div
              key={user._id}
              className='flex flex-col gap-2 md:flex-row justify-between items-center border-2 border-opacity-50 rounded p-2 bg-gray-800 border-gray-700'>
              <p
                className={`w-6 h-6 flex justify-center items-center rounded ${
                  index === 0 && 'bg-primary-400 text-primary-800'
                } ${index === 1 && 'bg-gray-300 text-gray-800'} ${
                  index === 2 && 'bg-primary-700 text-primary-400'
                }`}>
                {index + 1}
              </p>
              <p>{user.username}</p>
              <p>{user.totalTime} minutes</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Ranking;
