import React from 'react';

const Description = () => {
  return (
    <div className='bg-gray-100 dark:bg-gray-800 min-h-screen w-full flex justify-center p-4 items-center'>
      <div className='w-10/12 max-w-xl h-full flex flex-col gap-4'>
        <h2 className='text-4xl w-full text-center font-extrabold p-2'>
          Tutorial
        </h2>
        <p className='text-justify'>
          This app uses a popular studying method called {'"'}pomodoro{'"'}.
          Firstly it was used to schedule study session time for 25 minutes and
          break for 5. Then you repeat this process.
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

export default Description;
