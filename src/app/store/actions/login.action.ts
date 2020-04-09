import { Action } from '@ngrx/store';
import { Login } from './../../shared/models';

export const START_LOGIN = '[LOGIN] Start'
export const ABORT_LOGIN = '[LOGIN] Abort'

export class StartLogin implements Action {
  readonly type = START_LOGIN;

  constructor (public payload: Login) {}
}

export class AbortLogin implements Action {
  readonly type = ABORT_LOGIN;
}

export type Actions = StartLogin | AbortLogin