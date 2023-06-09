import User, { UserType } from '@/models/User';
import dbConnect from '@/lib/dbConnect';

export const revalidate = 60;

const Ranking = async () => {
  await dbConnect();

  const topUsers = await User.find()
    .select({ email: true, totalTime: true, username: true })
    .sort({ totalTime: -1 })
    .limit(10);

  return (
    <div className='flex flex-col items-center gap-4 w-full'>
      <div className='flex flex-col gap-2 w-full'>
        {topUsers.map((user: UserType, index) => (
          <div
            key={user._id}
            className='flex flex-col gap-2 md:flex-row justify-between items-center bg-primary-100 border-2 border-primary-600 border-opacity-50 rounded p-2 dark:bg-gray-800 dark:border-gray-700'>
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
