import {
	createContext,
	FC,
	ReactNode,
	useEffect,
	useState,
	useSyncExternalStore,
} from 'react';

interface OnlineStatusContextProps {
	online: boolean;
}

export const OnlineStatusContext = createContext<OnlineStatusContextProps>({
	online: false,
} as OnlineStatusContextProps);

export const OnlineStatusContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const online = useSyncExternalStore(subscribe, getSnapshot);

	function getSnapshot() {
		return navigator.onLine;
	}

	function subscribe(callback: () => void) {
		window.addEventListener('online', callback);
		window.addEventListener('offline', callback);
		return () => {
			window.removeEventListener('online', callback);
			window.removeEventListener('offline', callback);
		};
	}

	return (
		<OnlineStatusContext.Provider value={{ online }}>
			{children}
		</OnlineStatusContext.Provider>
	);
};
