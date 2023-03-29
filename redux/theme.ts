import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  theme: 'dark' | 'light';
};

const initialState: InitialState = {
  theme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
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
  },
});

export const { toggleTheme, initTheme } = themeSlice.actions;
export default themeSlice.reducer;
export const getTheme = (state: any) => state.theme.theme;
