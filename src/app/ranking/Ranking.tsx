'use client';

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Error from '../(common)/Error';
import Loading from '../loading';

const Ranking = () => {
  const [topUsers, setTopUsers] = useState<RankingTopUser[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTopUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('/api/top-users');
      setTopUsers(res.data);
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopUsers();
  }, [fetchTopUsers]);

  if (isLoading) return <Loading />;

  if (error) return <Error message={error} retry={fetchTopUsers} />;

  return (
    <div className='flex flex-col items-center gap-4 w-full'>
      <div className='flex flex-col gap-2 w-full'>
        {topUsers &&
          topUsers.length > 0 &&
          topUsers.map((user: User, index: number) => (
            <div
              key={user._id}
              className='flex flex-col gap-2 xs:flex-row justify-between items-center border-2 border-opacity-50 rounded p-2 bg-gray-800 border-gray-700'>
              <div className='flex-1 text-left'>
                <p
                  className={`w-6 h-6 flex justify-center items-center rounded ${
                    index === 0 && 'bg-primary-400 text-primary-800'
                  } ${index === 1 && 'bg-gray-300 text-gray-800'} ${
                    index === 2 && 'bg-primary-700 text-primary-400'
                  }`}>
                  {index + 1}
                </p>
              </div>
              <div className='flex-1 text-center'>
                <p>{user.username}</p>
              </div>
              <div className='flex-1 text-right'>
                <p>{user.totalTime} minutes</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Ranking;
