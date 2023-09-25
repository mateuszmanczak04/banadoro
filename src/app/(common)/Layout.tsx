import { ReactNode } from 'react';
import TimerModal from './TimerModal';
import Navigation from './Navigation';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      {/* @ts-ignore server component */}
      <Navigation />
      <TimerModal />
      <div>{children}</div>
    </>
  );
};

export default Layout;
