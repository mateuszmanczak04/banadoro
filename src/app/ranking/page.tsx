import Ranking from '@/app/ranking/Ranking';

export const fetchCache = 'force-no-store';

const page = async () => {
  return (
    <div className='mt-28 w-11/12 max-w-4xl pb-16 mx-auto flex flex-col items-center gap-4'>
      <h1 className='text-3xl font-bold'>Ranking</h1>
      {/* @ts-ignore server component */}
      <Ranking />
    </div>
  );
};

export default page;
