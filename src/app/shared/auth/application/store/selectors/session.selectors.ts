import { createSelector } from '@ngrx/store';
import { SessionState } from '../reducers/session.reducers';

export const sessionSelector = createSelector(
  (state: SessionState) => state.session,
  (session) => session
);

export const sessionOneSelector = createSelector(
  (state: SessionState) => state.sessionOne,
  (sessionone) => sessionone
);
