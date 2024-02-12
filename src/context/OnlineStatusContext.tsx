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
	const [onlineStatus, setOnlineStatus] = useState<boolean>(navigator.onLine);

	useEffect(() => {
		window.addEventListener('offline', () => {
			setOnlineStatus(false);
		});
		window.addEventListener('online', () => {
			setOnlineStatus(true);
		});

		return () => {
			window.removeEventListener('offline', () => {
				setOnlineStatus(false);
			});
			window.removeEventListener('online', () => {
				setOnlineStatus(true);
			});
		};
	}, []);

	return (
		<OnlineStatusContext.Provider value={{ online: onlineStatus }}>
			{children}
		</OnlineStatusContext.Provider>
	);
};
