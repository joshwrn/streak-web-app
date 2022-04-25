import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { exampleTasks } from '../components/Tasks/exampleTasks';
import { TaskProps } from '../types/taskTypes';

const initialState = {
  tasks: exampleTasks,
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskProps>) => {
      const update = [action.payload].concat(state.tasks);
      return { ...state, tasks: update };
    },
    markTaskAsCompleted: (state, action: PayloadAction<string>) => {
      const update = state.tasks.map((task) => {
        if (task.task === action.payload) {
          return { ...task, completed: task.completed ? false : true };
        } else {
          return task;
        }
      });
      return { ...state, tasks: update };
    },
  },
});

export const { addTask, markTaskAsCompleted } = taskSlice.actions;

export default taskSlice.reducer;
