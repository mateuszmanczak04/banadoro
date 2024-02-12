'use client';

import useAccountSettingsContext from '@/hooks/useAccountSettingsContext';
import { useSession } from 'next-auth/react';
import Error from '../(common)/Error';
import SignOutButton from '../(common)/SignOutButton';
import Loading from '../loading';
import UpdatePassword from './UpdatePassword';
import PasswordHint from './PasswordHint';

const AccountSettings = () => {
	const { data: session } = useSession();
	const { loading, error } = useAccountSettingsContext();

	if (!session) return null;

	if (loading)
		return (
			<div className='container flex flex-col items-center gap-1'>
				<p>Loading account settings...</p>
				<Loading />
			</div>
		);

	if (error) return <Error message={error} />;

	return (
		<div className='flex flex-col gap-4 w-full'>
			<h3 className='font-extrabold text-3xl w-full'>Account</h3>
			<UpdatePassword />
			<PasswordHint />
			<SignOutButton />
		</div>
	);
};

export default AccountSettings;
