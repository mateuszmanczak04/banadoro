import useSettingsContext from '@/hooks/useSettingsContext';
import { getDateSlug } from '@/lib/getDateSlug';
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
import { v4 as uuid } from 'uuid';

interface TimerContextProps {
  resetTotalTime: () => void;
  incrementUserTimeByAMinute: () => Promise<void> | void;
  fetchAllUserDays: () => Promise<void> | void;
  totalTime: number;
  todayTime: number;
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
  todayTime: 0,
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
  const [todayTime, setTodayTime] = useState(initialState.todayTime);
  const [error, setError] = useState(initialState.error);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [previousDays, setPreviousDays] = useState(initialState.previousDays);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(
    initialState.isTimerRunning
  );
  const [currentSessionTimePassed, setCurrentSessionTimePassed] =
    useState<number>(initialState.currentSessionTimePassed);
  const [mode, setMode] = useState<Mode>(initialState.mode);
  const [intervalId, setIntervalId] = useState<any>();
  const { autoStart, sessionTime, breakTime } = useSettingsContext();

  const resetTotalTime = () => {
    setTodayTime(0);
    setTotalTime(0);
  };

  const incrementUserTimeByAMinute = useCallback(async () => {
    if (!session?.user) return;

    setIsLoading(true);
    setError('');

    try {
      await axios.post('/api/time/increment-user-time');
      const todayDateSlug = getDateSlug(new Date());
      setPreviousDays((prev: Day[]) => {
        if (prev.find((day: Day) => day.date === todayDateSlug)) {
          return prev.map((d: Day) => {
            if (d.date === todayDateSlug) {
              return { ...d, totalTime: d.totalTime + 1 };
            }
            return d;
          });
        } else {
          return [...prev, { date: todayDateSlug, totalTime: 1, _id: uuid() }];
        }
      });
    } catch {
      setError('Could not increment user time.');
    } finally {
      setIsLoading(false);
    }
  }, [session?.user]);

  const fetchAllUserDays = useCallback(async () => {
    if (!session?.user) return;

    setIsLoading(true);
    setError('');

    try {
      const res = await axios.get('/api/time/get-user-total-time-and-days');
      setPreviousDays(res.data.days);
      setTotalTime(res.data.totalTime);
      setTodayTime(res.data.todayTime);
    } catch {
      setError('Could not fetch all users days.');
    } finally {
      setIsLoading(false);
    }
  }, [session?.user]);

  // audio notification
  const playNotification = () => {
    let audio = new Audio('/bell.wav');
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
      setCurrentSessionTimePassed((prev) => prev + 1);
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
        todayTime,
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
