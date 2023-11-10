import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';

import * as userActions from '../actions/user.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.cargarUsers),
      switchMap(() =>
        this.userService.getUser(1, 2).pipe(
          map((users) => userActions.cargarUsersSuccess({ users })),
          catchError((error) => of(userActions.cargarUsersError({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
