import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import xpReducer from '../slices/xpSlice';
import streakReducer from '../slices/streakSlice';
import pageReducer from '../slices/pageSlice';
import authReducer from '../slices/authSlice';

export const store = configureStore({
  reducer: {
    totalXP: xpReducer,
    tasks: streakReducer,
    page: pageReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
