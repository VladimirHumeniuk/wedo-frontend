import { Action } from '@ngrx/store';
import { User } from '../../shared/models';
import * as UserActions from '../actions/user.action';

const defaultUser = { accountType: 'GUEST' } as unknown as User;

export function userReducer(state: User, action: UserActions.Actions) {
  switch (action.type) {
    case UserActions.SAVE_USER:
      return { ...action.payload, loading: false }

    case UserActions.REMOVE_USER:
      return { loading: false };

    case UserActions.GET_USER:
      return { ...state, loading: true };

    case UserActions.AUTHENTICATED:
      return { ...state, ...action.payload, loading: false };

    case UserActions.NOT_AUTHENTICATED:
      return { ...defaultUser, loading: false };

    default:
      return { ...state, loading: true };
  }
}