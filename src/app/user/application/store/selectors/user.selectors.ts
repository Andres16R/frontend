import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/users.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectUsers = createSelector(selectUserState, (state) => state.users);
export const selectError = createSelector(selectUserState, (state) => state.error);