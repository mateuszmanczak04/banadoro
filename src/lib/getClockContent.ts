const getClockContent = (seconds: number) => {
	const nonNegativeSeconds = seconds >= 0 ? seconds : 0;
	return `${Math.floor(nonNegativeSeconds / 60)}:${(
		'00' + (nonNegativeSeconds % 60).toString()
	).slice(-2)}`;
};

export default getClockContent;
