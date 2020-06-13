import { Action } from '@ngrx/store';
import { User } from './../../shared/models';

export const SAVE_USER         = '[USER] Save';
export const REMOVE_USER       = '[USER] Remove';

export const GET_ALL_USERS          = '[USER] Get All Users';
export const GET_ALL_USERS_SUCCESS  = '[USER] Get All Users Success';
export const GET_ALL_USERS_ERROR    = '[USER] Get All Users Error';

export const GET_USER          = '[AUTH] Get User'
export const AUTHENTICATED     = '[AUTH] Authenticated'
export const NOT_AUTHENTICATED = '[AUTH] Not Authenticated'
export const AUTH_ERROR        = '[AUTH] ERROR'

export class SaveUser implements Action {
  readonly type = SAVE_USER;
  constructor(public payload: User) { }
}

export class RemoveUser implements Action {
  readonly type = REMOVE_USER;
}

export class GetUser implements Action {
  readonly type = GET_USER;
  constructor(public payload?: any) {}
}

export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
  constructor(public payload?: any) {}
}
export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;
  constructor(public payload?: any) {}
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload?: any) {}
}

export class GetAllUsers implements Action {
  readonly type = GET_ALL_USERS;

  constructor() {}
}
export class GetAllUsersSuccess implements Action {
  readonly type = GET_ALL_USERS_SUCCESS;

  constructor(public payload: { users: User[] }) {}
}

export class GetAllUsersError implements Action {
  readonly type = GET_ALL_USERS_ERROR;
  constructor() {}
}

export type Actions = SaveUser
  | RemoveUser
  | GetUser
  | Authenticated
  | NotAuthenticated
  | AuthError
  | GetAllUsers
  | GetAllUsersSuccess
  | GetAllUsersError;
