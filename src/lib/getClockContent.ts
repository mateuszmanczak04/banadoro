const getClockContent = (time: number) => {
	const nonNegativeTime = time >= 0 ? time : 0;

	const minutes = ('00' + Math.floor(nonNegativeTime / 60000).toString()).slice(
		-2,
	);

	const seconds = (
		'00' + Math.floor((nonNegativeTime % 60000) / 1000).toString()
	).slice(-2);

	// const milliseconds = ('000' + (nonNegativeTime % 1000).toString()).slice(-3);

	return `${minutes}:${seconds}`;
};

export default getClockContent;
