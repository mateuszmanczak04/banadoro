import Account from '@/components/account/Account';

const page = () => {
  return (
    <div className='w-full max-w-xl mt-20 mx-auto flex flex-col gap-4'>
      <h1 className='text-3xl font-bold'>Account</h1>
      <Account />
    </div>
  );
};

export default page;
