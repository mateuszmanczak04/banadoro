import AppProviders from '@/app/(common)/AppProviders';
import Layout from './(common)/Layout';
import '@/styles/globals.scss';

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: 'Banadoro 🍌 - Pomodoro Timer',
  description: 'Turn on timer for studying, create tasks, compete with others!',
};

const RootLayout = ({ children }: Props) => {
  return (
    <html>
      <body className='bg-gray-900 text-white scrollbar-none font-sans'>
        <AppProviders>
          <Layout>{children}</Layout>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
