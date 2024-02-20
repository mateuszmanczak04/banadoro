'use client';

import useTimerContext from '@/hooks/useTimerContext';
import { Button } from '../(common)/Button';
import Counter from './Counter';

const ClockFrame = () => {
	const { timeLeft, pause, running, play, mode, setMode } = useTimerContext();

	// changing modes
	const handleSetModeSession = () => {
		if (mode === 'session') return;
		setMode('session');
	};
	const handleSetModeBreak = () => {
		if (mode === 'break') return;
		setMode('break');
	};

	return (
		<div className='mx-auto p-4 rounded-md flex flex-col gap-4 items-center bg-gray-800 w-full'>
			<h2 className='text-3xl font-extrabold w-full text-center rounded px-2'>
				Focus!
			</h2>
			<div className='w-full flex gap-4'>
				<div className='rounded-md flex-[2] overflow-hidden flex'>
					<Button
						variant={mode === 'session' ? 'primary' : 'secondary'}
						className='flex-1 rounded-none'
						onClick={handleSetModeSession}>
						Session
					</Button>
					<Button
						variant={mode === 'session' ? 'secondary' : 'primary'}
						className='flex-1 rounded-none'
						onClick={handleSetModeBreak}>
						Break
					</Button>
				</div>
				<Button
					variant={running ? 'secondary' : 'primary'}
					className='flex-1'
					onClick={() => {
						if (running) pause();
						else play();
					}}>
					{running ? 'Pause' : 'Start'}
				</Button>
			</div>

			<Counter timeLeft={timeLeft} />
		</div>
	);
};

export default ClockFrame;
