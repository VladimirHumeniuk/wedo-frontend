import { MetaReducer, ActionReducer, Action } from '@ngrx/store';
import { AppState } from './../../app.state';
import { _localStorageSync } from './localStorageSync.reducer';
import { REMOVE_USER } from '../actions/user.action';
import { storeLogger } from 'ngrx-store-logger';

export function logger(reducer: ActionReducer<AppState>): any {
  return storeLogger()(reducer);
}

export function clearState(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: Action): AppState {
    if (action.type === REMOVE_USER) {
      state.user = undefined;
      state.alert = undefined;
      state.admin = undefined;
      state.login = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: Array<MetaReducer<any, any>> = [_localStorageSync, logger, clearState];
