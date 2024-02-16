'use client';

import getClockContent from '@/lib/getClockContent';
import { FC } from 'react';

interface Props {
	timeInSeconds: number;
}

const Counter: FC<Props> = ({ timeInSeconds }) => {
	// used to avoid showing negative values
	const time = timeInSeconds >= 0 ? timeInSeconds : 0;

	const clockContent = getClockContent(time);

	return (
		<div className='w-full text-[6rem] sm:text-[9rem] md:text-[12rem] text-center p-4 font-medium select-none leading-[6rem] sm:leading-[9rem] md:leading-[12rem]'>
			{clockContent}
		</div>
	);
};

export default Counter;
