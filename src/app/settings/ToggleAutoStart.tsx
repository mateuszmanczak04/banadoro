'use client';

import useOnlineStatusContext from '@/hooks/useOnlineStatusContext';
import useTimerSettingsContext from '@/hooks/useTimerSettingsContext';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '../(common)/Button';
import Loading from '../loading';

const ToggleAutoStart = () => {
	const { autoStart, setAutoStart } = useTimerSettingsContext();
	const { data: session } = useSession();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const { online } = useOnlineStatusContext();

	const handleClick = async () => {
		// user not signed in
		if (!session) {
			setAutoStart(!autoStart);
			return;
		}

		if (!online) {
			// cancel this request if user is offline
			return;
		}

		// user signed in
		setLoading(true);
		setError('');
		try {
			await axios.put('/api/settings/timer/auto-start', {
				autoStart: !autoStart,
			});
			setAutoStart(!autoStart);
		} catch (error: any) {
			if (error.response) {
				setError(error.response.data.message);
			} else {
				setError('An unknown error occurred.');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex flex-col w-full gap-4 bg-gray-800 p-4 rounded-md'>
			<label htmlFor='auto-start-button'>Auto Start</label>
			<Button
				id='auto-start-button'
				variant={autoStart ? 'primary' : 'secondary'}
				className='w-full'
				onClick={handleClick}
				type='button'
				disabled={loading}>
				{autoStart ? 'ON' : 'OFF'}
			</Button>
			{loading && <Loading />}
			{error && <p className='text-red-500'>{error}</p>}
		</div>
	);
};

export default ToggleAutoStart;
