import React, { ReactNode } from 'react';
import '../styles/globals.css';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en'>
      <head>
        <title>Pomodoro Timer</title>
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
