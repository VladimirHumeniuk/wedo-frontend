
import { AdminState } from 'src/app/store/states/admin.state';
import * as UserActions from '../actions/user.action';
import * as CompaniesActions from '../actions/companies.action';

export function adminReducer(
  state: AdminState = new AdminState(),
  action: UserActions.Actions | CompaniesActions.Actions
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

    case CompaniesActions.GET_ALL_COMPANIES: {
      return { ...state, loading: true, error: null };
    }

    case CompaniesActions.GET_ALL_COMPANIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        companies: [...action.payload.companies]
      };
    }

    case CompaniesActions.GET_ALL_COMPANIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: 'All Companies are not fetched',
      }
    }

    default:
      return state;
  }
}
