import { createAction } from '@ngrx/store';
import { Session } from '../../../domain/ISession';

export const getSession = createAction(
  '[Session] Get Session',
  (sessions: Session[]) => ({
    sessions,
  })
);
export const addSession = createAction(
  '[Session] Add Session',
  (session: Session) => ({
    session,
  })
);

export const resetValue = createAction('[Session] Reset Value');
