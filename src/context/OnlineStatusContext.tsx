import { createContext, FC, ReactNode, useEffect, useState } from 'react';

interface OnlineStatusContextProps {
	online: boolean;
}

export const OnlineStatusContext = createContext<OnlineStatusContextProps>({
	online: false,
} as OnlineStatusContextProps);

export const OnlineStatusContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [online, setOnline] = useState<boolean>(true); // Assuming online initially

	useEffect(() => {
		const handleOnline = () => setOnline(true);
		const handleOffline = () => setOnline(false);

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	return (
		<OnlineStatusContext.Provider value={{ online }}>
			{children}
		</OnlineStatusContext.Provider>
	);
};
