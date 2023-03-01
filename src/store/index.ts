import { configureStore } from '@reduxjs/toolkit';
import { timerSettingsReducer } from './timer/timerSettingsSlice';
import { tasksReducer } from './tasks/tasksSlice';
import { timerReducer } from './timer/timerSlice';
import { widgetsReducer } from './widgets/widgetsSlice';
import { userReducer } from './auth/users.slice';
import { preferencesReducer } from './preferences/preferencesSlice';
import { usersApi } from './auth/users.api';
import { tasksApi } from './tasks/tasksApi';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    timer: timerReducer,
    widgets: widgetsReducer,
    timerSettings: timerSettingsReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,

    user: userReducer,
    preferences: preferencesReducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(usersApi.middleware, tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
