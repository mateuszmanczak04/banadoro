'use client';

import { FC } from 'react';

interface Props {
	timeInSeconds: number;
}

const Counter: FC<Props> = ({ timeInSeconds }) => {
	const time = timeInSeconds >= 0 ? timeInSeconds : 0;

	const clockContent = `${Math.floor(time / 60)}:${(
		'00' + (time % 60).toString()
	).slice(-2)}`;

	return (
		<div className='w-full text-[6rem] sm:text-[9rem] md:text-[12rem] text-center p-4 font-medium select-none leading-[6rem] sm:leading-[9rem] md:leading-[12rem]'>
			{clockContent}
		</div>
	);
};

export default Counter;
