'use client';

import useTimerContext from '@/hooks/useTimerContext';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import {
	PlayIcon,
	PauseIcon,
	StopIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';

import { useEffect, useState } from 'react';
import getClockContent from '@/lib/getClockContent';

const TimerModal = () => {
	const { timeLeft, play, pause, running, mode, setMode } = useTimerContext();
	const [isOpen, setIsOpen] = useState(false);
	const [openOnNext, setOpenOnNext] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		// small timer is closed on the home page
		// is opens only after going to another url
		// exactly from the home page
		// for example if you close it in /settings
		// it won't open itself after immediately
		// switching to /account
		// must go firstly to / and then to /account
		// to see th timer there
		// timer must also be running
		if (pathname === '/') {
			setIsOpen(false);
			setOpenOnNext(true);
		} else {
			if (openOnNext && running) {
				setIsOpen(true);
				setOpenOnNext(false);
			}
		}
	}, [pathname, openOnNext, running]);

	const clockContent = getClockContent(timeLeft);

	return (
		<div
			className={clsx(
				'fixed bottom-20 right-4 xs:bottom-6 xs:right-6 text-white p-4 rounded-md z-50 flex flex-col items-center transition w-32 shadow-xl pt-8',
				mode === 'session'
					? 'bg-red-500 text-white'
					: 'bg-green-500 text-white',
				running && isOpen && 'opacity-75 hover:opacity-100',
				!isOpen && 'opacity-0 pointer-events-none',
			)}>
			{/* closing icon */}
			<XMarkIcon
				className='h-6 w-6 ml-auto absolute top-0 right-0 p-1 bg-white bg-opacity-20 box-content cursor-pointer rounded-tr-md rounded-bl-md hover:bg-opacity-30 transition'
				onClick={() => setIsOpen(false)}
			/>
			{/* timer */}
			<p className='text-xl font-extrabold font-mono'>{clockContent}</p>
			{/* mode */}
			<p className='opacity-75 text-sm'>
				{mode === 'session' ? 'Focus now' : 'Chill out'}
			</p>
			{/* controls */}
			<div className='mt-2 flex items-center gap-2'>
				{running ? (
					<PauseIcon
						className='w-8 h-8 box-content p-2 cursor-pointer bg-white bg-opacity-20 rounded-md hover:bg-opacity-30 transition'
						onClick={pause}
					/>
				) : (
					<PlayIcon
						className='w-8 h-8 box-content p-2 cursor-pointer bg-white bg-opacity-20 rounded-md hover:bg-opacity-30 transition'
						onClick={play}
					/>
				)}
				{/* stop current session and change mode */}
				<StopIcon
					className='w-4 h-4 box-content p-2 cursor-pointer border hover:bg-white hover:bg-opacity-20 transition rounded-md'
					onClick={() => {
						if (mode === 'session') {
							setMode('break');
						} else {
							setMode('session');
						}
					}}
				/>
			</div>
		</div>
	);
};

export default TimerModal;
