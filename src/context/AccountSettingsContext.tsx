import useOnlineStatusContext from '@/hooks/useOnlineStatusContext';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import {
	createContext,
	FC,
	ReactNode,
	useCallback,
	useEffect,
	useState,
} from 'react';

interface AccountSettingsContextProps {
	passwordHint: string;
	setPasswordHint: (hint: string) => void;
	loading: boolean;
	error: string;
}

export const AccountSettingsContext =
	createContext<AccountSettingsContextProps>({} as AccountSettingsContextProps);

export const AccountSettingsContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	// session
	const { data: session, status: sessionStatus } = useSession();
	const { online } = useOnlineStatusContext();

	// loading and error
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// password hint
	const [passwordHint, setPasswordHint] = useState('');

	const init = useCallback(async () => {
		if (sessionStatus === 'loading') return;

		// unauthenticated
		if (!session) {
			setLoading(false);
			return;
		}

		if (!online) {
			// cancel this request if user is offline
			setLoading(false);
			return;
		}

		// authenticated
		try {
			const res = await axios.get('/api/settings/account');
			const { passwordHint } = res.data as { passwordHint: string };
			setPasswordHint(passwordHint);
		} catch (error: any) {
			if (error.response) {
				setError(error.response.data.message);
			} else {
				setError('An unknown error occurred.');
			}
		} finally {
			setLoading(false);
		}
	}, [session, setPasswordHint, online, sessionStatus]);

	useEffect(() => {
		init();
	}, [init, online]);

	return (
		<AccountSettingsContext.Provider
			value={{
				passwordHint,
				setPasswordHint,
				loading,
				error,
			}}>
			{children}
		</AccountSettingsContext.Provider>
	);
};
