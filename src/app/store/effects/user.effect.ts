
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services';
import { Authenticated, NotAuthenticated, AuthError } from 'src/app/store/actions/user.action';

@Injectable()
export class UserEffects {

  constructor(
    private readonly actions: Actions,
    private readonly userService: UserService
  ) { }

  @Effect()
  getUser$: Observable<Action> = this.actions.pipe(
    ofType('[AUTH] Get User'),
    switchMap(x => this.userService.getAuth()),
    map((authData: any) => authData && authData.uid || null),
    switchMap(uid => {
      if (uid) {
        return this.userService.getUser(uid).pipe(
          map(user => {
				return new Authenticated(user)
			 })
        );
      } else {
        return of(new NotAuthenticated());
      }
    }),
    catchError(x => of(new AuthError()))
  );
}
