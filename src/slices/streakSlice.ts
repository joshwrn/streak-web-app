import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

import { StreakTypes } from '../types/streakTypes';
import streakService from '../services/streakService';

interface InitialProps {
  tasks: StreakTypes[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: InitialProps = {
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new streak
export const createStreak = createAsyncThunk<
  any,
  StreakTypes,
  { state: RootState }
>('streaks/create', async (streakData: StreakTypes, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.user.token;
    return await streakService.createStreak(streakData, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user streaks
export const getStreaks = createAsyncThunk<
  any,
  string,
  {
    state: RootState;
  }
>('streaks/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.user.token;
    console.log('token', token);

    return await streakService.getStreaks(token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const streakSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    markStreakAsCompleted: (state, action: PayloadAction<string>) => {
      const update = state.tasks.map((task) => {
        if (task.task === action.payload) {
          return { ...task, completed: task.completed ? false : true };
        } else {
          return task;
        }
      });
      return { ...state, tasks: update };
    },
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create new streak
      .addCase(createStreak.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStreak.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(createStreak.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // get
      .addCase(getStreaks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStreaks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getStreaks.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { markStreakAsCompleted, reset } = streakSlice.actions;

export default streakSlice.reducer;
