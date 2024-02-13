'use client';

import { FC } from 'react';

interface Props {
	timeInSeconds: number;
}

const Counter: FC<Props> = ({ timeInSeconds }) => {
	return (
		<div className='w-full text-[6rem] sm:text-[9rem] md:text-[12rem] text-center p-4 font-medium select-none leading-[6rem] sm:leading-[9rem] md:leading-[12rem]'>
			{Math.floor(timeInSeconds / 60)}:
			{('00' + (timeInSeconds % 60).toString()).slice(-2)}
		</div>
	);
};

export default Counter;
