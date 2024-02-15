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
	useMemo,
	useRef,
	useState,
} from 'react';

interface TimerContextProps {
	resetTotalTime: () => void;
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
	const { autoStart, sessionTime, breakTime } = useTimerSettingsContext();
	const { online } = useOnlineStatusContext();

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

	const resetTotalTime = useCallback(() => {
		setTotalTime(0);
	}, []);

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

	// audio notification after finished session
	const playNotification = useCallback(() => {
		let audio = new Audio('/audio/bell.wav');
		audio.play();
	}, []);

	// send a request to the API to increment user's time by a minute
	const incrementUserTimeByAMinute = useCallback(async () => {
		// console.log('increment user time by a minute');

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
	}, [online, session?.user]);

	const timer = useMemo(() => {
		let timerId: ReturnType<typeof setInterval> | null = null;
		let totalTimePlayed = 0; // in seconds
		let totalTimePaused = 0; // in milliseconds
		let startTime: number | null = null; // in milliseconds (Date.now())
		let lastPauseTime: number | null = null; // in milliseconds (Date.now())
		let running = false;
		let sessionDuration: number | null = null;
		let breakDuration: number | null = null;

		// console.log('timer is re-rendered', totalTimePlayed, lastPauseTime);

		const reset = () => {
			pause(); // clearInterval, running=false, timerId=null
			startTime = null;
			lastPauseTime = null;
			totalTimePaused = 0;
			totalTimePlayed = 0;
			setCurrentSessionTimePassed(0);
		};

		const setValidTime = () => {
			if (startTime === null) return;
			totalTimePlayed = Math.floor(
				(Date.now() - startTime - totalTimePaused) / 1000,
			);
		};

		// const setDocumentTitle = () => {
		// 	let clockContent = `${Math.floor(
		// 		((mode === 'session' ? sessionDuration! : breakDuration!) -
		// 			totalTimePlayed) /
		// 			60,
		// 	)}:${(
		// 		'00' +
		// 		(
		// 			((mode === 'session' ? sessionDuration! : breakDuration!) -
		// 				totalTimePlayed) %
		// 			60
		// 		).toString()
		// 	).slice(-2)}`;
		// 	if (running) {
		// 		if (mode === 'session') {
		// 			clockContent = `Study now - ${clockContent}`;
		// 		} else {
		// 			clockContent = `Time for a break - ${clockContent}`;
		// 		}
		// 	} else {
		// 		clockContent = `Paused - ${clockContent}`;
		// 	}
		// 	document.title = clockContent;
		// };

		const increment = () => {
			if (startTime === null) return;

			setValidTime();
			setCurrentSessionTimePassed(totalTimePlayed);

			if (mode === 'session') {
				if (totalTimePlayed % 60 === 0) {
					incrementUserTimeByAMinute();
				}
				if (totalTimePlayed >= sessionDuration!) {
					reset();
					playNotification();
					setMode('break');
				}
			} else if (mode === 'break' && totalTimePlayed >= breakDuration!) {
				reset();
				playNotification();
				setMode('session');
			}

			// console.group('iteration of incremential');
			// console.log('total time played:', totalTimePlayed);
			// console.log('total time paused:', totalTimePaused);
			// console.log('start time:', startTime);
			// console.log('lastPauseTime:', lastPauseTime);
			// console.log('running:', running);
			// console.log('sessionTime:', sessionDuration);
			// console.log('breakTime:', breakDuration);
			// console.log('---------------');
			// console.groupEnd();
		};

		const play = () => {
			if (running) {
				// console.warn('Timer is already running.');
				return;
			}
			if (startTime === null) {
				startTime = Date.now();
			}
			setIsTimerRunning(true);
			running = true;
			// increase totalTimePaused with the duration of non playing
			if (lastPauseTime !== null) {
				totalTimePaused += Date.now() - lastPauseTime;
			}
			timerId = setInterval(() => {
				increment();
			}, 1000);
		};

		const pause = () => {
			if (!running) {
				// console.warn('Timer is already paused.');
				return;
			}
			setIsTimerRunning(false);
			running = false;
			lastPauseTime = Date.now();
			if (timerId) {
				clearInterval(timerId);
			}
			timerId = null;
		};

		const setSessionDuration = (duration: number) => {
			sessionDuration = duration;
		};

		const setBreakDuration = (duration: number) => {
			breakDuration = duration;
		};

		return {
			increment,
			play,
			pause,
			setSessionDuration,
			setBreakDuration,
		};
	}, [mode, playNotification, incrementUserTimeByAMinute]);

	// end session and break after exceeding time
	// useEffect(() => {
	// 	if (mode === 'session' && currentSessionTimePassed === sessionTime) {
	// 		if (!autoStart) handlePause();
	// 		setMode('break');
	// 		setCurrentSessionTimePassed(0);
	// 		playNotification();
	// 		return;
	// 	} else if (mode === 'break' && currentSessionTimePassed === breakTime) {
	// 		setCurrentSessionTimePassed(0);
	// 		if (!autoStart) handlePause();
	// 		setMode('session');
	// 		playNotification();
	// 		return;
	// 	}
	// }, [
	// 	currentSessionTimePassed,
	// 	handlePause,
	// 	mode,
	// 	sessionTime,
	// 	breakTime,
	// 	autoStart,
	// ]);

	// fetch all user days if he is signed in on the app start
	useEffect(() => {
		fetchAllUserDays();
	}, [fetchAllUserDays, session?.user]);

	useEffect(() => {
		timer.setSessionDuration(sessionTime);
		timer.setBreakDuration(breakTime);
	}, [sessionTime, breakTime, timer]);

	return (
		<TimerContext.Provider
			value={{
				resetTotalTime,
				fetchAllUserDays,
				totalTime,
				previousDays,
				error,
				isLoading,
				mode,
				setMode,
				currentSessionTimePassed,
				setCurrentSessionTimePassed,
				isTimerRunning,
				handleRun: timer.play,
				handlePause: timer.pause,
			}}>
			{children}
		</TimerContext.Provider>
	);
};
