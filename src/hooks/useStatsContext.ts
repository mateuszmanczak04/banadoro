import { StatsContext } from '@/context/StatsContext';
import { useContext } from 'react';

const useStatsContext = () => {
	const context = useContext(StatsContext);

	if (context === undefined) {
		throw new Error(
			'useStatsContext must be used within a OnlineStatusContextProvider',
		);
	}

	return context;
};

export default useStatsContext;
