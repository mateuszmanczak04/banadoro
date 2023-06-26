import '@/styles/globals.css';
import TopBar from './TopBar';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <TopBar />
      <div className='mt-24'>{children}</div>
    </>
  );
};

export default Layout;
