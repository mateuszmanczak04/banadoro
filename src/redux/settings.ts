import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  autoStart: boolean;
};

const initialState: InitialState = {
  autoStart: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleAutoStart: (state) => {
      state.autoStart = !state.autoStart;
    },
  },
});

export const { toggleAutoStart } = settingsSlice.actions;
export default settingsSlice.reducer;
export const getAutoStart = (state: any) => state.settings.autoStart;
