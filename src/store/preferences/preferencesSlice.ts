import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const LS_THEME_KEY = 'isDarkTheme';

interface PreferencesState {
  isDarkTheme: boolean;
}

const initialState: PreferencesState = {
  isDarkTheme: JSON.parse(localStorage.getItem(LS_THEME_KEY) ?? 'false'),
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleTheme(state, action: PayloadAction<boolean>) {
      state.isDarkTheme = action.payload;
      localStorage.setItem(LS_THEME_KEY, JSON.stringify(state.isDarkTheme));
    },
  },
});

export const preferencesActions = preferencesSlice.actions;
export const preferencesReducer = preferencesSlice.reducer;
