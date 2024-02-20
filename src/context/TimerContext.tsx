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
	running: boolean;
	mode: Mode;
	setMode: (newMode: Mode) => void;
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
	} = useTimerSettingsContext();
	const { setPreviousDays, setTotalTime } = useStatsContext();
	const { online } = useOnlineStatusContext();

	const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
	const running = useRef(false);
	const autoStart = useRef(settingsAutoStart);
	const mode = useRef<Mode>('session');
	const timePlayed = useRef(0); // current session time played
	const timePaused = useRef(0); // current session time paused
	const startTime = useRef<number | null>(null);
	const lastPausedTime = useRef<number | null>(null);
	const sessionTime = useRef(settingsSessionTime);
	const breakTime = useRef(settingsBreakTime);
	const nextValue = useRef(1000);

	const [returnState, setReturnState] = useState({
		timeLeft: settingsSessionTime,
		running: false,
		mode: 'session' as Mode,
	});
	const [error, setError] = useState('');

	const getCurrentExactSecond = useCallback(() => {
		return nextValue.current - 1000;
	}, []);

	const setDocumentTitle = useCallback((title: string) => {
		document.title = title;
	}, []);

	const updateUI = useCallback(() => {
		setReturnState({
			mode: mode.current,
			running: running.current,
			timeLeft:
				(mode.current === 'session' ? sessionTime.current : breakTime.current) -
				getCurrentExactSecond(),
		});
	}, [getCurrentExactSecond]);

	const setMode = useCallback(
		(newMode: Mode) => {
			mode.current = newMode;
			running.current = false;
			timePlayed.current = 0;
			timePaused.current = 0;
			startTime.current = null;
			lastPausedTime.current = null;
			nextValue.current = 1000;
			if (intervalId.current) {
				clearInterval(intervalId.current);
			}
			if (mode.current === 'session') {
				setDocumentTitle(`Pomodoro - ${getClockContent(sessionTime.current)}`);
				updateUI();
			} else {
				setDocumentTitle(`Break - ${getClockContent(breakTime.current)}`);
				updateUI();
			}
		},
		[updateUI, setDocumentTitle],
	);

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

	const nextSecondPassed = useCallback(() => {
		nextValue.current += 1000;
		if (mode.current === 'session') {
			// entire minute passed:
			if (nextValue.current % 60000 === 0) {
				incrementUserTimeByAMinute();
			}
			setDocumentTitle(
				`Pomodoro - ${getClockContent(
					sessionTime.current - getCurrentExactSecond(),
				)}`,
			);
		} else {
			setDocumentTitle(
				`Break - ${getClockContent(
					breakTime.current - getCurrentExactSecond(),
				)}`,
			);
		}
		updateUI();
	}, [
		incrementUserTimeByAMinute,
		updateUI,
		getCurrentExactSecond,
		setDocumentTitle,
	]);

	const timerEnded = useCallback(() => {
		playNotification();
		nextValue.current = 1000;
		timePlayed.current = 0;
		timePaused.current = 0;
		lastPausedTime.current = null;
		if (autoStart.current) {
			startTime.current = Date.now();
		} else {
			if (intervalId.current) {
				clearInterval(intervalId.current);
			}
			running.current = false;
			startTime.current = null;
		}
		updateUI();
	}, [playNotification, updateUI]);

	const sessionEnded = useCallback(() => {
		mode.current = 'break';
		timerEnded();
	}, [timerEnded]);

	const breakEnded = useCallback(() => {
		mode.current = 'session';
		timerEnded();
	}, [timerEnded]);

	const play = useCallback(() => {
		if (running.current) return;

		// check if the timer was launched for the first time
		if (startTime.current === null) {
			startTime.current = Date.now();
		}

		// calculate paused time duration
		if (lastPausedTime.current !== null) {
			timePaused.current += Date.now() - lastPausedTime.current;
		}

		running.current = true;
		updateUI();

		// set interval of 100ms to increment timePlayed and when
		// it reaches the next value it should get, increase "nextValue"
		// by 1 second and update the UI:
		intervalId.current = setInterval(() => {
			if (startTime.current !== null) {
				// increment the time:
				timePlayed.current =
					Date.now() - startTime.current - timePaused.current;

				// the next second passed:
				if (timePlayed.current >= nextValue.current) {
					nextSecondPassed();
				}

				// session/break ended:
				if (
					mode.current === 'session' &&
					timePlayed.current >= sessionTime.current
				) {
					sessionEnded();
				} else if (
					mode.current === 'break' &&
					timePlayed.current >= breakTime.current
				) {
					breakEnded();
				}
			}
		}, 100);
	}, [nextSecondPassed, sessionEnded, breakEnded, updateUI]);

	const pause = useCallback(() => {
		if (!running.current) return;

		if (intervalId.current) {
			clearInterval(intervalId.current);
		}
		running.current = false;
		lastPausedTime.current = Date.now();
		updateUI();
	}, [updateUI]);

	// sync session/break duration with settings
	useEffect(() => {
		sessionTime.current = settingsSessionTime;
		breakTime.current = settingsBreakTime;
		updateUI();
	}, [settingsSessionTime, settingsBreakTime, updateUI]);

	// sync auto start with settings
	useEffect(() => {
		autoStart.current = settingsAutoStart;
	}, [settingsAutoStart]);

	return (
		<TimerContext.Provider
			value={{
				play,
				pause,
				running: returnState.running,
				timeLeft: returnState.timeLeft,
				mode: returnState.mode,
				setMode,
			}}>
			{children}
		</TimerContext.Provider>
	);
};
