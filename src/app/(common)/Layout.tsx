import { ReactNode } from 'react';
import TimerModal from './TimerModal';
import TopBar from './TopBar';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      {/* @ts-ignore server component */}
      <TopBar />
      <TimerModal />
      <div className='mt-20 sm:mt-24'>{children}</div>
    </>
  );
};

export default Layout;
