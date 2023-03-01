import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../models';

interface TimerState {
  currentTask: ITask | null;
  isRunning: boolean;
  isPomodoroStarted: boolean;
}

const initialState: TimerState = {
  currentTask: null,
  isRunning: false,
  isPomodoroStarted: false,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    addTaskToTimer(state, action: PayloadAction<ITask>) {
      state.currentTask = action.payload;
    },

    removeTaskFromTimer(state, action: PayloadAction<string>) {
      if (state.currentTask) {
        if (action.payload !== state.currentTask._id) return;
      }
      state.currentTask = null;
    },

    setIsRunning(state, action: PayloadAction<boolean>) {
      state.isRunning = action.payload;
    },

    setIsPomodoroStarted(state, action: PayloadAction<boolean>) {
      state.isPomodoroStarted = action.payload;
    },
  },
});

export const timerActions = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
