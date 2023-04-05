import React, { useEffect, useState } from 'react';
import appAxios from '../../lib/appAxios';
import Loading from './Loading';
import { UserType } from '../../models/User';

const TopUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTopUsers = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await appAxios.get('/api/ranking/get-top-users');
        setUsers(response.data.users);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <div className='flex flex-col gap-2 w-full'>
      {users.map((user: UserType, index) => (
        <div
          key={user._id}
          className='flex flex-col gap-2 md:flex-row justify-between items-center bg-gray-100 border-2 border-gray-200 border-opacity-50 rounded p-2 dark:bg-gray-800 dark:border-gray-700'>
          <p
            className={`w-6 h-6 flex justify-center items-center rounded ${
              index === 0 && 'bg-yellow-400 text-yellow-800'
            } ${index === 1 && 'bg-gray-300 text-gray-800'} ${
              index === 2 && 'bg-yellow-700 text-yellow-400'
            }`}>
            {index + 1}
          </p>
          <p>{user.email}</p>
          <p>{user.totalTime} minutes</p>
        </div>
      ))}
      {loading && <Loading />}
      {error && <p className='error'>{error}</p>}
    </div>
  );
};

export default TopUsers;
