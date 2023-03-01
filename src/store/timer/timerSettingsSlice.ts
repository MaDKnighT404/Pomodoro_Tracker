import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { alarmSounds, ambientSounds } from '../../constants/timerSettings';

const LS_TIMER_SETTINGS_KEY = 'timer_settings';

interface TimerSettingsState {
  workPeriodInMinutes: number;
  shortBreakPeriodInMinutes: number;
  longBreakPeriodInMinutes: number;
  longBreakInterval: number;
  autoRunWork: boolean;
  autoRunBreak: boolean;
  offBreak: boolean;
  alarmSound: keyof typeof alarmSounds | '';
  ambientSound: keyof typeof ambientSounds | '';
}

const initialState: TimerSettingsState = JSON.parse(
  localStorage.getItem(LS_TIMER_SETTINGS_KEY) || 'null'
) ?? {
  workPeriodInMinutes: 25,
  shortBreakPeriodInMinutes: 5,
  longBreakPeriodInMinutes: 15,
  longBreakInterval: 4,
  autoRunWork: true,
  autoRunBreak: true,
  offBreak: false,
  alarmSound: 'digital',
  ambientSound: 'tickingSlow',
};

export const timerSettingsSlice = createSlice({
  name: 'timerSettings',
  initialState,
  reducers: {
    setTimerSettings(state, action: PayloadAction<Partial<TimerSettingsState>>) {
      localStorage.setItem(LS_TIMER_SETTINGS_KEY, JSON.stringify({ ...state, ...action.payload }));
      return { ...state, ...action.payload };
    },
  },
});

export const timerSettingsActions = timerSettingsSlice.actions;
export const timerSettingsReducer = timerSettingsSlice.reducer;
