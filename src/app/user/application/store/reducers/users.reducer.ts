import { createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';
import { IUser } from '../../../domain/IUser';

export interface UserState {
    users: IUser[];
    error: string | null;
}

export const initialState: UserState = {
    users: [],
    error: null
};

export const userReducer = createReducer(
    initialState,
    on(userActions.cargarUsersSuccess, (state, { users }) => ({ ...state, users, error: null })),
    on(userActions.cargarUsersError, (state, { error }) => ({ ...state, users: [], error }))
)