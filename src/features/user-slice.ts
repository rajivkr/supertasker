import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import data from '../api/data.json';

export type UserState = {
  entities: User[];
};

const initialState: UserState = { entities: data.users };

type DraftUser = RequireOnly<User, 'realName' | 'alterEgo'>;

const convertUser = (draft: DraftUser): User => {
  return { id: nanoid(), tasks: [], ...draft };
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<DraftUser>) => {
      state.entities.unshift(convertUser(action.payload));
    },
    removeUser: (state, action: PayloadAction<User['id']>) => {
      const index = state.entities.findIndex(
        (obj) => obj.id === action.payload,
      );
      state.entities.splice(index, 1);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.entities.findIndex(
        (obj) => obj.id === action.payload.id,
      );
      state.entities[index] = convertUser(action.payload);
    },
  },
});

export const userReducer = usersSlice.reducer;
export const { addUser, removeUser, updateUser } = usersSlice.actions;

export default usersSlice;
