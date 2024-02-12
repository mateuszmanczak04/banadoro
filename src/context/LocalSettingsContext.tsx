import useLocalStorage from '@/hooks/useLocalStorage';
import {
	createContext,
	FC,
	ReactNode,
	useCallback,
	useEffect,
	useState,
} from 'react';

interface LocalSettingsContextProps {
	hasAccount: boolean;
	setHasAccount: (hasAccount: boolean) => void;
	loading: boolean;
}

export const LocalSettingsContext = createContext<LocalSettingsContextProps>(
	{} as LocalSettingsContextProps,
);

export const LocalSettingsContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	// info if has someone signed in on this device
	const [hasAccount, setHasAccount] = useLocalStorage<boolean>(
		'hasAccount',
		false,
	);

	// loading and error
	const [loading, setLoading] = useState(true);

	const init = useCallback(() => {
		setLoading(false);
	}, []);

	useEffect(() => {
		init();
	}, [init]);

	return (
		<LocalSettingsContext.Provider
			value={{
				hasAccount,
				setHasAccount,
				loading,
			}}>
			{children}
		</LocalSettingsContext.Provider>
	);
};
