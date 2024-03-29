'use client';

import { FC } from 'react';
import ToggleAutoStart from './ToggleAutoStart';
import useTimerSettingsContext from '@/hooks/useTimerSettingsContext';
import Loading from '../loading';
import Error from '../(common)/Error';
import UpdateTimers from './UpdateTimers';

interface TimerSettingsProps {}

const TimerSettings: FC<TimerSettingsProps> = ({}) => {
	const { loading, error } = useTimerSettingsContext();

	if (loading)
		return (
			<div className='container flex flex-col items-center gap-1'>
				<p>Loading timer settings...</p>
				<Loading />
			</div>
		);

	if (error) return <Error message={error} />;

	return (
		<div className='flex flex-col gap-4 w-full'>
			<h3 className='font-extrabold text-3xl w-full'>Timer</h3>
			<UpdateTimers />
			<ToggleAutoStart />
		</div>
	);
};

export default TimerSettings;
