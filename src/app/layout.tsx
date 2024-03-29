import AppProviders from '@/app/(common)/AppProviders';
import '@/styles/globals.scss';
import { ReactNode } from 'react';
import Layout from './(common)/Layout';

interface Props {
	children: ReactNode;
}

export const metadata = {
	title: 'Banadoro - Pomodoro Timer',
	description: 'Turn on timer for studying, create tasks, compete with others!',
	icons: {
		apple: '/images/icons/icon-512x512.png',
	},
	themeColor: '#111827',
	appleWebApp: true,
	manifest: '/manifest.webmanifest',
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
