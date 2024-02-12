import OfflineWrapper from '../(common)/OfflineWrapper';
import SignOutButton from '../(common)/SignOutButton';
import AccountSettings from './AccountSettings';
import TimerSettings from './TimerSettings';

const page = async () => {
	return (
		<div className='bottom-menu container flex flex-col  gap-12'>
			<OfflineWrapper
				className='w-full text-center'
				content="You can't change your settings when you are offline.">
				<TimerSettings />
				<AccountSettings />
			</OfflineWrapper>
		</div>
	);
};

export default page;
