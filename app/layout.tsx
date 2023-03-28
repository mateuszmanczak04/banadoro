import React, { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <html lang='en'>{children}</html>;
};

export default RootLayout;
