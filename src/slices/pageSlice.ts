import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  page: <pageTypes>'Tasks',
};

export type pageTypes = 'Tasks' | 'Focus' | 'Create' | 'Stats';

const pageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<pageTypes>) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;

export default pageSlice.reducer;
