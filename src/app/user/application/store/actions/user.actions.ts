import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../domain/IUser';

export const cargarUsers = createAction('[Users] Load Users');

export const cargarUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: IUser[] }>()
);

export const cargarUsersError = createAction(
  '[Users] Load Users Error',
  props<{ error: string }>()
);
