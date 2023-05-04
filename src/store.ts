import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './features/tasks-slice';
import usersSlice from './features/user-slice';

const rootStore = configureStore({
  reducer: {
    [tasksSlice.name]: tasksSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
  },
});

export type ApplicationState = ReturnType<typeof rootStore.getState>;

export type ApplicationDispatch = typeof rootStore.dispatch;

export default rootStore;
