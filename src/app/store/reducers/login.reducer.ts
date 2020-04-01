import { Action } from '@ngrx/store';
import { Login } from '../../shared/models';
import * as LoginActions from '../actions/login.action';

export function loginReducer(state: Login, action: LoginActions.Actions) {
  switch (action.type) {
    case LoginActions.START_LOGIN:
      return { ...action.payload };

    case LoginActions.ABORT_LOGIN:
      return {};

    default:
      return {};
  }
}