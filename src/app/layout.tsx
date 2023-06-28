import AppProviders from '@/components/AppProviders';
import Layout from '@/components/Layout';
import '@/styles/globals.scss';

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export const metadata = {
  title: 'Banadoro 🍌 - Pomodoro Timer',
  description: 'Turn on timer for studying, create tasks, compete with others!',
};

const RootLayout = ({ children, modal }: Props) => {
  return (
    <html>
      <body className='bg-gray-900 text-white scrollbar-none font-sans'>
        <AppProviders>
          <Layout>
            {children}
            {modal}
          </Layout>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
