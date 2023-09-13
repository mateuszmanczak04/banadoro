import { ReactNode } from 'react';
import TopBar from './TopBar';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      {/* @ts-ignore server component */}
      <TopBar />
      <div className='mt-24'>{children}</div>
    </>
  );
};

export default Layout;
