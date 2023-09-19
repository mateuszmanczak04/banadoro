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
      <div>{children}</div>
    </>
  );
};

export default Layout;
