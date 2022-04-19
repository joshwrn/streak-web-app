import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import xpReducer from '../utils/xpSlice';
import taskSlice from '../components/Tasks/taskSlice';
import pageSlice from './pageSlice';

export const store = configureStore({
  reducer: {
    totalXP: xpReducer,
    tasks: taskSlice,
    page: pageSlice,
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
