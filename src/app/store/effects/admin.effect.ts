import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserService, CompaniesService } from 'src/app/shared/services';

import {
  GET_ALL_USERS,
  GetAllUsers,
  GetAllUsersSuccess,
  GetAllUsersError
} from 'src/app/store/actions/user.action';

import {
  GET_ALL_COMPANIES,
  GetAllCompaniesSuccess,
  GetAllCompaniesError,
  REMOVE_COMPANY,
  RemoveCompany,
  RemoveCompanySuccess,
  RemoveCompanyError,
  GetAllCompanies
} from 'src/app/store/actions/companies.action';

@Injectable()
export class AdminEffects {
  constructor(
    private readonly actions: Actions,
    private readonly userService: UserService,
    private readonly companiesService: CompaniesService
  ) {}

  @Effect()
  getAllUsers$: Observable<Action> = this.actions.pipe(
    ofType(GET_ALL_USERS),
    switchMap((action: GetAllUsers) => {
      return this.userService.getAllUsers()
    }),
    map(users => new GetAllUsersSuccess({ users })),
    catchError(_ => of(new GetAllUsersError()))
  );

  @Effect()
  getAllCompanies$: Observable<Action> = this.actions.pipe(
    ofType(GET_ALL_COMPANIES),
    switchMap(_ => this.companiesService.getAllCompanies()),
    map(companies => new GetAllCompaniesSuccess({ companies })),
    catchError(_ => of(new GetAllCompaniesError()))
  );

  @Effect()
  removeCompany$: Observable<Action> = this.actions.pipe(
    ofType(REMOVE_COMPANY),
    switchMap((action: RemoveCompany) =>
      this.companiesService
        .removeCompany(action.payload.cid)
        .pipe(
          map(_ => ({ cid: action.payload.cid }))
        )
    ),
    switchMap(({ cid }) => [
      new RemoveCompanySuccess({ cid }),
      new GetAllCompanies()
    ]),
    catchError(x => of(new RemoveCompanyError()))
  );
}
