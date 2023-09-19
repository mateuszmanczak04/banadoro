import Settings from './Settings';

const page = () => {
  return (
    <div className='w-11/12 max-w-4xl mt-20 mx-auto flex flex-col items-center gap-4'>
      <h1 className='text-3xl font-bold'>Settings</h1>
      <Settings />
    </div>
  );
};

export default page;
