import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import appAxios from '../lib/appAxios';

type InitialState = {
  sessionTime: number;
  breakTime: number;
  totalTime: number;
  todayTime: number;
  loading: boolean;
  error: string;
  previousDays: {}[];
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
      const response = await appAxios.post('/api/time/increment-user-time');
      return {
        totalTime: response.data.totalTime,
        todayTime: response.data.todayTime,
      };
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
    builder.addCase(incrementUserTimeByAMinute.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.totalTime = action.payload.totalTime;
      state.todayTime = action.payload.todayTime;
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
