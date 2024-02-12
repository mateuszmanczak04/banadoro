import useOnlineStatusContext from '@/hooks/useOnlineStatusContext';
import useTimerSettingsContext from '@/hooks/useTimerSettingsContext';
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

interface TimerContextProps {
	resetTotalTime: () => void;
	incrementUserTimeByAMinute: () => Promise<void> | void;
	fetchAllUserDays: () => Promise<void> | void;
	totalTime: number;
	error: string;
	isLoading: boolean;
	previousDays: Day[];
	mode: Mode;
	setMode: (mode: Mode) => void;
	currentSessionTimePassed: number;
	setCurrentSessionTimePassed: (time: number) => void;
	handlePause: () => void;
	isTimerRunning: boolean;
	handleRun: () => void;
}

const initialState: TimerContextProps = {
	totalTime: 0,
	error: '',
	isLoading: false,
	previousDays: [],
	resetTotalTime: () => {},
	incrementUserTimeByAMinute: () => {},
	fetchAllUserDays: () => {},
	mode: 'session',
	setMode: () => {},
	currentSessionTimePassed: 0,
	setCurrentSessionTimePassed: () => {},
	handlePause: () => {},
	isTimerRunning: false,
	handleRun: () => {},
};

export const TimerContext = createContext<TimerContextProps>(initialState);

export const TimerContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const { data: session } = useSession();
	const [totalTime, setTotalTime] = useState(initialState.totalTime);
	const [error, setError] = useState(initialState.error);
	const [isLoading, setIsLoading] = useState(initialState.isLoading);
	const [previousDays, setPreviousDays] = useState(initialState.previousDays);
	const [isTimerRunning, setIsTimerRunning] = useState<boolean>(
		initialState.isTimerRunning,
	);
	const [currentSessionTimePassed, setCurrentSessionTimePassed] =
		useState<number>(initialState.currentSessionTimePassed);
	const [mode, setMode] = useState<Mode>(initialState.mode);
	const [intervalId, setIntervalId] = useState<any>();
	const { autoStart, sessionTime, breakTime } = useTimerSettingsContext();
	const { online } = useOnlineStatusContext();

	const resetTotalTime = () => {
		setTotalTime(0);
	};

	const incrementUserTimeByAMinute = useCallback(async () => {
		if (!session?.user) return;

		if (!online) {
			// cancel this request if user is offline
			return;
		}

		setError('');

		try {
			// update user time in stats after every minute
			const res = await axios.post('/api/time/increment-user-time');
			const { today, totalTime }: { today: Day; totalTime: number } = res.data;

			setPreviousDays((prev: Day[]) => {
				if (prev.find((day: Day) => day.date === today.date)) {
					return prev.map((d: Day) => {
						if (d.date === today.date) {
							return { ...d, totalTime: today.totalTime };
						}
						return d;
					});
				} else {
					return [...prev, today];
				}
			});
			setTotalTime(totalTime);
		} catch (error: any) {
			if (error.response) {
				setError(error.response.data.message);
			} else {
				setError('An unknown error occurred.');
			}
		}
	}, [session?.user, online]);

	const fetchAllUserDays = useCallback(async () => {
		if (!session?.user) return;

		if (!online) {
			// cancel this request if user is offline
			return;
		}

		setIsLoading(true);
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
			setIsLoading(false);
		}
	}, [session?.user, online]);

	// audio notification
	const playNotification = () => {
		let audio = new Audio('/audio/bell.wav');
		audio.play();
	};

	// updating total time
	useEffect(() => {
		if (
			mode === 'session' &&
			currentSessionTimePassed > 0 &&
			currentSessionTimePassed % 60 === 0
		) {
			incrementUserTimeByAMinute();
		}
	}, [currentSessionTimePassed, incrementUserTimeByAMinute, mode]);

	// run and pause
	const handleRun = () => {
		setIsTimerRunning(true);
		const id = setInterval(() => {
			setCurrentSessionTimePassed(prev => prev + 1);
		}, 1000);
		setIntervalId(id);
	};

	const handlePause = useCallback(() => {
		setIsTimerRunning(false);
		clearInterval(intervalId);
	}, [intervalId]);

	// end session and break after exceeding time
	useEffect(() => {
		if (mode === 'session' && currentSessionTimePassed === sessionTime) {
			if (!autoStart) handlePause();
			setMode('break');
			setCurrentSessionTimePassed(0);
			playNotification();
			return;
		} else if (mode === 'break' && currentSessionTimePassed === breakTime) {
			setCurrentSessionTimePassed(0);
			if (!autoStart) handlePause();
			setMode('session');
			playNotification();
			return;
		}
	}, [
		currentSessionTimePassed,
		handlePause,
		mode,
		sessionTime,
		breakTime,
		autoStart,
	]);

	// fetch all user days if he is signed in on the app start
	useEffect(() => {
		fetchAllUserDays();
	}, [fetchAllUserDays, session?.user]);

	return (
		<TimerContext.Provider
			value={{
				resetTotalTime,
				incrementUserTimeByAMinute,
				fetchAllUserDays,
				totalTime,
				previousDays,
				error,
				isLoading,
				mode,
				setMode,
				currentSessionTimePassed,
				setCurrentSessionTimePassed,
				handlePause,
				isTimerRunning,
				handleRun,
			}}>
			{children}
		</TimerContext.Provider>
	);
};
