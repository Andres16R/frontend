import { createAction } from '@ngrx/store';
import { User } from '../reducers/user.reducer';

export const getUser = createAction('[User] Get User', (users: User[]) => ({
  users,
}));
export const addUser = createAction('[User] Add User', (user: User) => ({
  user,
}));