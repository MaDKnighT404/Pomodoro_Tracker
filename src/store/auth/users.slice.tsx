import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models';

const LS_USER_KEY = 'user';
const LS_ISREG_KEY = 'isReg';

const initialState: IUser = {
  fullName: JSON.parse(localStorage.getItem(LS_USER_KEY) ?? '[]'),
  isRegistred: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserName(state, action: PayloadAction<string>) {
      state.fullName = action.payload;
      localStorage.setItem(LS_USER_KEY, JSON.stringify(state.fullName));
    },
    switchRegistred(state, action: PayloadAction<boolean>) {
      state.isRegistred = action.payload;
      localStorage.setItem(LS_ISREG_KEY, JSON.stringify(state.isRegistred));
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
