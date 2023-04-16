import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  theme: string;
  autoStart: boolean;
};

const initialState: InitialState = {
  theme: 'dark',
  autoStart: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.theme === 'light') {
        state.theme = 'dark';
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('color-theme', 'dark');
      } else {
        state.theme = 'light';
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('color-theme', 'light');
      }
    },
    initTheme: (state) => {
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('color-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('color-theme', 'light');
      }
    },
    toggleAutoStart: (state) => {
      state.autoStart = !state.autoStart;
    },
  },
});

export const { toggleTheme, initTheme, toggleAutoStart } =
  settingsSlice.actions;
export default settingsSlice.reducer;
export const getTheme = (state: any) => state.settings.theme;
export const getAutoStart = (state: any) => state.settings.autoStart;
