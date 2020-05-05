import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services';

import { GET_ALL_USERS, GetAllUsersSuccess, GetAllUsersError } from 'src/app/store/actions/user.action';

@Injectable()
export class AdminEffects {
  constructor(
    private readonly actions: Actions,
    private readonly userService: UserService
  ) {}

  @Effect()
  getAllUsers$: Observable<Action> = this.actions.pipe(
    ofType(GET_ALL_USERS),
    switchMap(_ => this.userService.getAllUsers()),
    map(users => new GetAllUsersSuccess({ users })),
    catchError(_ => of(new GetAllUsersError()))
  );
}
