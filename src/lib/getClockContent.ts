const getClockContent = (seconds: number) => {
	return `${Math.floor(seconds / 60)}:${(
		'00' + (seconds % 60).toString()
	).slice(-2)}`;
};

export default getClockContent;
