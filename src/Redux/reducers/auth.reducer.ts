import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../Types/User.Types';
import { Dict } from '../../Types/Utils.Types';

type UserState = {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  organization?: string;
  isAuthenticated: boolean;
}
const initialState : UserState = {
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    // @ts-ignore
    login: (state, action) => {
      const userData : IUser = action.payload;
      return { isAuthenticated: true, ...userData };
    },
    // @ts-ignore
    logout: (state: Dict<string | boolean>) => {
      const newState : Dict<string | boolean> = { ...state };
      Object.keys(state).forEach((x) => {
        if (x !== 'isAuthenticated') {
          delete newState[x];
        }
      });
      newState.isAuthenticated = false;
      return newState;
    },

  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
