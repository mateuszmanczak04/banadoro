import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import appAxios from '../lib/appAxios';
import { getDateSlug } from '../lib/getDateSlug';
import { uuid } from 'uuidv4';

type InitialState = {
  sessionTime: number;
  breakTime: number;
  totalTime: number;
  todayTime: number;
  loading: boolean;
  error: string;
  previousDays: Day[];
};

export type Day = {
  totalTime: number;
  date: string;
  _id: string;
};

const initialState: InitialState = {
  sessionTime: 25 * 60,
  breakTime: 5 * 60,
  totalTime: 0,
  todayTime: 0,
  error: '',
  loading: false,
  previousDays: [],
};

export const incrementUserTimeByAMinute = createAsyncThunk(
  'timer/increment',
  async (_, thunkAPI) => {
    try {
      appAxios.post('/api/time/increment-user-time');
    } catch (err) {
      return thunkAPI.rejectWithValue('Could not increment user time.');
    }
  }
);

export const fetchAllUserDays = createAsyncThunk(
  'timer/get-all-user-days',
  async (_, thunkAPI) => {
    try {
      const response = await appAxios.get('/api/time/init-user-total-time');

      return {
        days: response.data.days,
        totalTime: response.data.totalTime,
        todayTime: response.data.todayTime,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue('Could not fetch all users days.');
    }
  }
);

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setSessionTime: (state, action) => {
      state.sessionTime = action.payload;
    },
    setBreakTime: (state, action) => {
      state.breakTime = action.payload;
    },
    resetTotalTime: (state) => {
      state.totalTime = 0;
      state.todayTime = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(incrementUserTimeByAMinute.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(incrementUserTimeByAMinute.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
      state.totalTime += 1;
      state.todayTime += 1;
      const todayDateSlug = getDateSlug(new Date());
      // if current day exists in store, increment its totalTime
      if (state.previousDays.find((day: Day) => day.date === todayDateSlug)) {
        state.previousDays = state.previousDays.map((d: Day) => {
          if (d.date === todayDateSlug) {
            return { ...d, totalTime: d.totalTime + 1 };
          }
          return d;
        });
      } else {
        // else add new day to store with totalTime 1
        state.previousDays.push({
          date: todayDateSlug,
          _id: uuid(),
          totalTime: 1,
        });
      }
    });
    builder.addCase(incrementUserTimeByAMinute.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchAllUserDays.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchAllUserDays.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.previousDays = action.payload.days;
      state.todayTime = action.payload.todayTime;
      state.totalTime = action.payload.totalTime;
    });
    builder.addCase(fetchAllUserDays.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default timerSlice.reducer;
export const { setSessionTime, setBreakTime, resetTotalTime } =
  timerSlice.actions;
export const getSessionTime = (state: any) => state.timer.sessionTime;
export const getBreakTime = (state: any) => state.timer.breakTime;
export const getTodayTime = (state: any) => state.timer.todayTime;
export const getTotalTime = (state: any) => state.timer.totalTime;
export const getPreviousDays = (state: any) => state.timer.previousDays;
