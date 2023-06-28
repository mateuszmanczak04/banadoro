import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

// export const revalidate = 10;

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const Ranking = async () => {
  await dbConnect();

  const topUsers: RankingTopUser[] = await User.find()
    .select({ totalTime: true, username: true })
    .sort({ totalTime: -1 });

  return (
    <div className='flex flex-col items-center gap-4 w-full'>
      <div className='flex flex-col gap-2 w-full'>
        {topUsers.map((user: User, index: number) => (
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
