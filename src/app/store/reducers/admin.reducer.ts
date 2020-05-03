
import {AdminState} from 'src/app/store/states/admin.state';
import * as UserActions from '../actions/user.action';

export function adminReducer(
  state: AdminState = new AdminState(),
  action: UserActions.Actions
) {
  switch (action.type) {

    case UserActions.GET_ALL_USERS: {
      return { ...state, loading: true, error: null };
    }

    case UserActions.GET_ALL_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        users: [...action.payload.users]
      };
    }

    case UserActions.GET_ALL_USERS_ERROR: {
      return {
        ...state,
        loading: false,
        error: 'All Users are not fetched',
      }
    }

    default:
      return state;
  }
}
