'use client';

import { ReactNode } from 'react';
import TimerModal from './TimerModal';
import Navigation from './Navigation';
import { useSession } from 'next-auth/react';
import Loading from './Loading';
import useOnlineStatusContext from '@/hooks/useOnlineStatusContext';

interface Props {
	children: ReactNode;
}

const Layout = ({ children }: Props) => {
	const { status } = useSession();
	const { online } = useOnlineStatusContext();

	if (status === 'loading')
		return (
			<div className='bottom-menu container'>
				<Loading />
			</div>
		);

	return (
		<>
			{/* @ts-ignore server component */}
			{!online && (
				<div className='fixed bottom-16 xs:bottom-0 h-[32px] leading-[32px] inset-x-0 text-white bg-red-500 text-center px-2'>
					You are offline
				</div>
			)}
			<Navigation />
			<TimerModal />
			<div>{children}</div>
		</>
	);
};

export default Layout;
