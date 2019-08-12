import { Action } from '@ngrx/store';
import { Alert } from '../shared/models';
import * as AlertActions from '../actions/alert.action';

export function alertReducer(state: Alert[] = [], action: AlertActions.Actions) {
  switch(action.type) {
    case AlertActions.ADD_ALERT:
      return [...state, action.payload]

    case AlertActions.REMOVE_ALERT:
      state.splice(action.payload, 1)
      return state

    default:
        return state
  }
}