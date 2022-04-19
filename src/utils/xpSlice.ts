import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  totalXP: 300,
};

export const xpSlice = createSlice({
  name: 'totalXP',
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.totalXP += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.totalXP -= action.payload;
    },
  },
});

export const { incrementByAmount, decrementByAmount } = xpSlice.actions;

export default xpSlice.reducer;
