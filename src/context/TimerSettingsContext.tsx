import Loading from '@/app/loading';
import useLocalStorage from '@/hooks/useLocalStorage';
import useOnlineStatusContext from '@/hooks/useOnlineStatusContext';
import axios from 'axios';
import { has } from 'lodash';
import { set } from 'mongoose';
import { useSession } from 'next-auth/react';
import {
	createContext,
	FC,
	ReactNode,
	useCallback,
	useEffect,
	useState,
} from 'react';

interface TimerSettingsContextProps {
	autoStart: boolean;
	setAutoStart: (autoStart: boolean) => void;
	sessionTime: number;
	setSessionTime: (time: number) => void;
	breakTime: number;
	setBreakTime: (time: number) => void;
	loading: boolean;
	error: string;
}

export const TimerSettingsContext = createContext<TimerSettingsContextProps>(
	{} as TimerSettingsContextProps,
);

export const TimerSettingsContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	// session
	const { data: session, status: sessionStatus } = useSession();
	const { online } = useOnlineStatusContext();

	// loading and error
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// settings
	const [autoStart, setAutoStart] = useLocalStorage<boolean>(
		'autoStart',
		false,
	);
	const [sessionTime, setSessionTime] = useLocalStorage<number>(
		'sessionTime',
		25 * 60,
	);
	const [breakTime, setBreakTime] = useLocalStorage<number>(
		'breakTime',
		5 * 60,
	);

	const init = useCallback(async () => {
		if (sessionStatus === 'loading') return;

		// offline
		if (!session) {
			setLoading(false);
			return;
		}

		if (!online) {
			// cancel this request if user is offline
			return;
		}

		// online
		try {
			const res = await axios.get('/api/settings/timer');
			const { autoStart, sessionTime, breakTime } = res.data as {
				autoStart: boolean;
				sessionTime: number;
				breakTime: number;
			};
			setAutoStart(autoStart);
			setSessionTime(sessionTime);
			setBreakTime(breakTime);
		} catch (error: any) {
			if (error.response) {
				setError(error.response.data.message);
			} else {
				setError('An unknown error occurred.');
			}
		} finally {
			setLoading(false);
		}
	}, [
		setAutoStart,
		setSessionTime,
		setBreakTime,
		session,
		online,
		sessionStatus,
	]);

	useEffect(() => {
		init();
	}, [init]);

	return (
		<TimerSettingsContext.Provider
			value={{
				autoStart,
				setAutoStart,
				sessionTime,
				setSessionTime,
				breakTime,
				setBreakTime,
				loading,
				error,
			}}>
			{children}
		</TimerSettingsContext.Provider>
	);
};
