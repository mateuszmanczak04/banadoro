import { OnlineStatusContext } from '@/context/OnlineStatusContext';
import { useContext } from 'react';

const useOnlineStatusContext = () => {
	const context = useContext(OnlineStatusContext);
	if (context === undefined) {
		throw new Error(
			'useOnlineStatusContext must be used within a OnlineStatusContextProvider',
		);
	}

	return context;
};

export default useOnlineStatusContext;
