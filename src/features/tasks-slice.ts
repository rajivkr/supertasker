import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import data from '../api/data.json';

export type TaskState = {
  entities: Task[];
};

const initialState: TaskState = { entities: data.tasks };

export type DraftTask = RequireOnly<Task, 'title'>;

export const convertFromDraft = (draft: DraftTask): Task => {
  return { id: nanoid(), ...draft };
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<DraftTask>) => {
      state.entities.unshift(convertFromDraft(action.payload));
    },
    removeTask: (state, action: PayloadAction<Task['id']>) => {
      const index = state.entities.findIndex(
        (obj) => obj.id === action.payload,
      );
      state.entities.splice(index, 1);
    },
  },
});

export const taskReducer = tasksSlice.reducer;
export const { addTask, removeTask } = tasksSlice.actions;

export default tasksSlice;
