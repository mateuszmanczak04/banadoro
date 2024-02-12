import Ranking from '@/app/ranking/Ranking';
import OfflineWrapper from '../(common)/OfflineWrapper';

export const fetchCache = 'force-no-store';

const page = async () => {
	return (
		<div className='bottom-menu container flex flex-col items-center gap-4'>
			<OfflineWrapper content="You can't see the ranking list when you are offline.">
				<h1 className='text-3xl font-bold'>Ranking</h1>
				<Ranking />
			</OfflineWrapper>
		</div>
	);
};

export default page;
