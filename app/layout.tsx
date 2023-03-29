import React, { ReactNode } from 'react';
import '../styles/globals.css';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en'>
      <head>
        <title>Pomodoro Timer</title>
      </head>
      <body className='bg-white dark:bg-gray-900 text-gray-800 dark:text-white'>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
