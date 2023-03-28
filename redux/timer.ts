import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  sessionTime: number;
  breakTime: number;
  totalTime: number;
};

const initialState: InitialState = {
  sessionTime: 25 * 60,
  breakTime: 5 * 60,
  totalTime: 0,
};

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
  },
});

export default timerSlice.reducer;
export const { setSessionTime, setBreakTime } = timerSlice.actions;
export const getSessionTime = (state: any) => state.timer.sessionTime;
export const getBreakTime = (state: any) => state.timer.breakTime;
