'use client';

import getClockContent from '@/lib/getClockContent';
import { FC } from 'react';

interface Props {
	timeLeft: number;
}

const Counter: FC<Props> = ({ timeLeft }) => {
	const clockContent = getClockContent(timeLeft);

	return (
		<div className='w-full text-[6rem] sm:text-[9rem] md:text-[12rem] text-center p-4 font-medium select-none leading-[6rem] sm:leading-[9rem] md:leading-[12rem]'>
			{clockContent}
		</div>
	);
};

export default Counter;
