import useOnlineStatusContext from '@/hooks/useOnlineStatusContext';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';

interface StatsContextProps {
	totalTime: number;
	setTotalTime: (time: number) => void;
	previousDays: Day[];
	setPreviousDays: React.Dispatch<React.SetStateAction<any>>;
	resetTotalTime: () => void;
	fetchAllUserDays: () => Promise<void> | void;
	loading: boolean;
	error: string;
}

export const StatsContext = createContext<StatsContextProps>(
	{} as StatsContextProps,
);

export const StatsContextProvider: FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// external
	const { data: session } = useSession();
	const { online } = useOnlineStatusContext();

	// internal
	const [totalTime, setTotalTime] = useState(0);
	const [previousDays, setPreviousDays] = useState([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const resetTotalTime = useCallback(() => {
		setTotalTime(0);
	}, []);

	const fetchAllUserDays = useCallback(async () => {
		if (!session?.user) return;

		if (!online) {
			// cancel this request if user is offline
			return;
		}

		setLoading(true);
		setError('');

		try {
			const res = await axios.get('/api/time/get-user-total-time-and-days');
			setPreviousDays(res.data.days);
			setTotalTime(res.data.totalTime);
		} catch (error: any) {
			if (error.response) {
				setError(error.response.data.message);
			} else {
				setError('An unknown error occurred.');
			}
		} finally {
			setLoading(false);
		}
	}, [session?.user, online]);

	useEffect(() => {
		fetchAllUserDays();
	}, [fetchAllUserDays, session?.user]);

	return (
		<StatsContext.Provider
			value={{
				totalTime,
				setTotalTime,
				previousDays,
				setPreviousDays,
				resetTotalTime,
				fetchAllUserDays,
				loading,
				error,
			}}>
			{children}
		</StatsContext.Provider>
	);
};
