import { Action } from '@ngrx/store';
import { User } from '../shared/models';
import * as UserActions from '../actions/user.action';

export function userReducer(state: User, action: UserActions.Actions) {
  switch(action.type) {
    case UserActions.SAVE_USER:
      return [action.payload]

    case UserActions.REMOVE_USER:
      state = undefined
      return state

    default:
        return state
  }
}