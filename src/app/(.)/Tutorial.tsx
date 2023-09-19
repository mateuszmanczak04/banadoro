const Tutorial = () => {
  return (
    <div className='bg-gray-800 min-h-screen w-full flex justify-center items-center'>
      <div className='w-11/12 max-w-4xl h-full flex flex-col gap-4'>
        <h2 className='text-4xl w-full text-center font-extrabold p-2'>
          Tutorial
        </h2>
        <p className='text-justify leading-7'>
          {'"'}Banadoro 🍌{'"'} app uses a popular studying method called {'"'}
          pomodoro{'"'}. Firstly it was used to schedule study session time for
          25 minutes and break for 5 (but you can adjust this time to your
          needs). Then you repeat this process.
          <br />
          <br />
          After longer time of work, our focus becomes weaker so we need to take
          a break.
          <br />
          <br />
          You may use this web application without creating an account but you
          are limited to offline mode only. By registering you can compete with
          others on time spent in session mode. (you can see current top users
          in {'"'}Ranking{'"'} tab)
        </p>
      </div>
    </div>
  );
};

export default Tutorial;
