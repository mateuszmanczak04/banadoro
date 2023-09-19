import Settings from './Settings';

const page = () => {
  return (
    <div className='mt-28 w-11/12 max-w-4xl mx-auto flex flex-col items-center gap-4'>
      <h1 className='text-3xl font-bold'>Settings</h1>
      <Settings />
    </div>
  );
};

export default page;
