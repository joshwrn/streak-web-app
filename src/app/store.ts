import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import xpReducer from '../slices/xpSlice';
import taskSlice from '../slices/taskSlice';
import pageSlice from '../slices/pageSlice';

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
