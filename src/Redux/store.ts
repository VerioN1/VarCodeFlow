import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/auth.reducer';

export const store = configureStore({
  reducer: {
    userData: userSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
