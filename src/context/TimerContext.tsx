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
  setSessionTime: (time: number) => void;
  setBreakTime: (time: number) => void;
  incrementUserTimeByAMinute: () => void;
  fetchAllUserDays: () => void;
  sessionTime: number;
  breakTime: number;
  totalTime: number;
  todayTime: number;
  error: string;
  isLoading: boolean;
  previousDays: Day[];
}

const initialState: TimerContextProps = {
  sessionTime: 25 * 60,
  breakTime: 5 * 60,
  totalTime: 0,
  todayTime: 0,
  error: '',
  isLoading: false,
  previousDays: [],
  resetTotalTime: () => {},
  setSessionTime: () => {},
  setBreakTime: () => {},
  incrementUserTimeByAMinute: () => {},
  fetchAllUserDays: () => {},
};

export const TimerContext = createContext<TimerContextProps>(initialState);

export const TimerContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const [sessionTime, setSessionTime] = useState(initialState.sessionTime);
  const [breakTime, setBreakTime] = useState(initialState.breakTime);
  const [totalTime, setTotalTime] = useState(initialState.totalTime);
  const [todayTime, setTodayTime] = useState(initialState.todayTime);
  const [error, setError] = useState(initialState.error);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [previousDays, setPreviousDays] = useState(initialState.previousDays);

  const resetTotalTime = () => {
    setTodayTime(0);
    setTotalTime(0);
  };

  const incrementUserTimeByAMinute = useCallback(async () => {
    console.log('increment');
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

  useEffect(() => {
    fetchAllUserDays();
  }, [fetchAllUserDays]);

  return (
    <TimerContext.Provider
      value={{
        resetTotalTime,
        setSessionTime,
        setBreakTime,
        incrementUserTimeByAMinute,
        fetchAllUserDays,
        sessionTime,
        breakTime,
        todayTime,
        totalTime,
        previousDays,
        error,
        isLoading,
      }}>
      {children}
    </TimerContext.Provider>
  );
};
