import Ranking from '@/components/ranking/Ranking';

const page = () => {
  return (
    <div className='w-full max-w-xl mt-20 mx-auto flex flex-col gap-4'>
      <h1 className='text-3xl font-bold'>Ranking</h1>
      <Ranking />
    </div>
  );
};

export default page;
