'use client';

import TotalTime from '@/app/stats/TotalTime';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import OfflineWrapper from '../(common)/OfflineWrapper';
import Loading from '../loading';

const StatsPage = () => {
	const { status } = useSession();

	if (status === 'loading') return <Loading />;

	if (status === 'unauthenticated') redirect('/');

	return (
		<div className='bottom-menu container flex flex-col items-center gap-4 rounded-xl'>
			<OfflineWrapper content="You cann't see your stats when you are offline.">
				<h1 className='text-3xl font-bold'>Stats</h1>
				<div className='flex flex-col items-center gap-4 w-full'>
					<TotalTime />
				</div>
			</OfflineWrapper>
		</div>
	);
};

export default StatsPage;
