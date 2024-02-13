'use client';

import useLocalSettingsContext from '@/hooks/useLocalSettingsContext';
import useOnlineStatusContext from '@/hooks/useOnlineStatusContext';
import useTasksContext from '@/hooks/useTasksContext';
import useTimerContext from '@/hooks/useTimerContext';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Button } from './Button';

const SignOutButton: FC<{ route: string }> = ({ route }) => {
	const { resetTotalTime } = useTimerContext();
	const { setTasks } = useTasksContext();
	const { setHasAccount } = useLocalSettingsContext();
	const { online } = useOnlineStatusContext();
	const router = useRouter();

	const handleSignOut = () => {
		setTasks([]);
		resetTotalTime();
		setHasAccount(true);
		signOut({ redirect: false });
		router.replace(route);
	};

	return (
		<Button variant='primary' onClick={handleSignOut} disabled={!online}>
			Sign out
		</Button>
	);
};

export default SignOutButton;
