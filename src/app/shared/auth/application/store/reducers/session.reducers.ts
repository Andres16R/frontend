import { createReducer, on } from '@ngrx/store';
import { Session } from '../../../domain/ISession';
import { addSession, getSession, resetValue } from '../actions/session.action';

export interface SessionState {
  session: Session[];
  sessionOne: Session
}

const initialState: Session[] = [];

export const sessionReducer = createReducer(
  initialState,
  on(getSession, (state, { sessions }) => [...sessions]),
  on(addSession, (state, { session }) => [...state, session]),
  on(resetValue, (state) => ({ ...state, value: '' }))
);
