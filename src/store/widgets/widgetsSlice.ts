import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WidgetsState {
  isSettingsVisible: boolean;
}

const initialState: WidgetsState = {
  isSettingsVisible: false,
};

export const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    setIsSettingsVisible(state, action: PayloadAction<boolean>) {
      state.isSettingsVisible = action.payload;
    },
  },
});

export const widgetsActions = widgetsSlice.actions;
export const widgetsReducer = widgetsSlice.reducer;
