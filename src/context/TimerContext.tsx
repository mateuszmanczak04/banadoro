import useOnlineStatusContext from '@/hooks/useOnlineStatusContext';
import useStatsContext from '@/hooks/useStatsContext';
import useTimerSettingsContext from '@/hooks/useTimerSettingsContext';
import getClockContent from '@/lib/getClockContent';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import {
	createContext,
	FC,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

interface TimerContextProps {
	timeLeft: number;
	play: () => void;
	pause: () => void;
	reset: () => void;
	running: boolean;
}

const initialState: TimerContextProps = {} as TimerContextProps;

export const TimerContext = createContext<TimerContextProps>(initialState);

export const TimerContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const { data: session } = useSession();
	const {
		autoStart: settingsAutoStart,
		sessionTime: settingsSessionTime,
		breakTime: settingsBreakTime,
		mode,
		setMode,
	} = useTimerSettingsContext();
	const { setPreviousDays, setTotalTime } = useStatsContext();
	const { online } = useOnlineStatusContext();

	const timerId = useRef<ReturnType<typeof setInterval> | null>(null);
	const running = useRef(false);
	const autoStart = useRef(settingsAutoStart);
	const timerMode = useRef<Mode>('session');
	const timePlayed = useRef(0); // current session time played
	const timePaused = useRef(0); // current session time paused
	const startTime = useRef<number | null>(null);
	const lastPausedTime = useRef<number | null>(null);
	const sessionTime = useRef(settingsSessionTime);
	const breakTime = useRef(settingsBreakTime);

	const [returnState, setReturnState] = useState({
		timeLeft: settingsSessionTime,
		running: false,
	});
	const [error, setError] = useState('');

	// todo - add autoStart option
	// todo - fix bug that sometimes it jumps by 2 seconds

	// update time which is used to be displayed on UI
	const updateTimeLeft = useCallback(() => {
		const newTimeLeft = Math.floor(
			(timerMode.current === 'session'
				? sessionTime.current - timePlayed.current
				: breakTime.current - timePlayed.current) / 1000,
		);
		setReturnState(prev => ({
			...prev,
			timeLeft: newTimeLeft,
		}));
	}, []);

	// calculate the time passed during current session based on Date.now()
	const setValidTime = useCallback(() => {
		if (startTime.current === null) return;
		timePlayed.current = Date.now() - startTime.current - timePaused.current;
		updateTimeLeft();
	}, [updateTimeLeft]);

	const updateDocumentTitle = useCallback(() => {
		if (timerMode.current === 'session') {
			const timeLeft = sessionTime.current - timePlayed.current;
			document.title = `Pomodoro: ${getClockContent(
				Math.floor(timeLeft / 1000),
			)}`;
		} else {
			const timeLeft = breakTime.current - timePlayed.current;
			document.title = `Break: ${getClockContent(Math.floor(timeLeft / 1000))}`;
		}
	}, []);

	const playNotification = useCallback(() => {
		let audio = new Audio('/audio/bell.wav');
		audio.play();
	}, []);

	// send a request to the API to increment user's time by a minute
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
	}, [online, session?.user, setPreviousDays, setTotalTime]);

	const pause = useCallback(() => {
		if (!running) {
			console.warn('Timer is already paused.');
			return;
		}
		running.current = false;
		setReturnState(prev => ({ ...prev, running: false }));
		lastPausedTime.current = Date.now();
		if (timerId.current) {
			clearInterval(timerId.current);
			timerId.current = null;
		}
	}, []);

	const reset = useCallback(() => {
		pause(); // clearInterval, running=false, timerId=null
		startTime.current = null;
		lastPausedTime.current = null;
		timePaused.current = 0;
		timePlayed.current = 0;
		setValidTime();
		updateTimeLeft();
	}, [pause, setValidTime, updateTimeLeft]);

	const increment = useCallback(() => {
		if (startTime.current === null) return;

		setValidTime();
		updateDocumentTitle();

		if (timerMode.current === 'session') {
			if (timePlayed.current % 60 === 0) {
				incrementUserTimeByAMinute();
			}
			if (timePlayed.current >= sessionTime.current) {
				reset();
				playNotification();
				setMode('break');
				updateDocumentTitle();
			}
		} else if (
			timerMode.current === 'break' &&
			timePlayed.current >= breakTime.current
		) {
			reset();
			playNotification();
			setMode('session');
			updateDocumentTitle();
		}
	}, [
		incrementUserTimeByAMinute,
		playNotification,
		updateDocumentTitle,
		reset,
		setMode,
		setValidTime,
	]);

	const play = useCallback(() => {
		if (running.current) {
			console.warn('Timer is already running.');
			return;
		}
		if (startTime.current === null) {
			startTime.current = Date.now();
		}
		running.current = true;
		setReturnState(prev => ({ ...prev, running: true }));
		// increase totalTimePaused with the duration of non playing
		if (lastPausedTime.current !== null) {
			timePaused.current += Date.now() - lastPausedTime.current;
		}
		timerId.current = setInterval(() => {
			increment();
		}, 1000);
	}, [running, increment]);

	// sync session/break duration with settings
	useEffect(() => {
		sessionTime.current = settingsSessionTime;
		breakTime.current = settingsBreakTime;
		updateTimeLeft();
	}, [settingsSessionTime, settingsBreakTime, updateTimeLeft]);

	// sync mode with settings
	useEffect(() => {
		timerMode.current = mode;
		reset();
	}, [mode, reset]);

	// sync auto start with settings
	useEffect(() => {
		autoStart.current = settingsAutoStart;
	}, [settingsAutoStart]);

	return (
		<TimerContext.Provider
			value={{
				play,
				pause,
				reset,
				running: returnState.running,
				timeLeft: returnState.timeLeft,
			}}>
			{children}
		</TimerContext.Provider>
	);
};
