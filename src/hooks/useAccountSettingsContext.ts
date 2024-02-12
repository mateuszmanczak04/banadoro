import { AccountSettingsContext } from '@/context/AccountSettingsContext';
import { useContext } from 'react';

const useAccountSettingsContext = () => {
	const context = useContext(AccountSettingsContext);

	if (!context) {
		throw new Error(
			'useAccountSettingsContext must be used within a AccountSettingsProvider',
		);
	}

	return context;
};

export default useAccountSettingsContext;
