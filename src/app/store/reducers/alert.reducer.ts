import { Alert } from '../../shared/models';
import * as AlertActions from '../actions/alert.action';

export function alertReducer(state: Alert[] = [], action: AlertActions.Actions) {
  switch(action.type) {
    case AlertActions.ADD_ALERT:
      return [...state, action.payload]

    case AlertActions.REMOVE_ALERT:
      // For some reasons, object comes to array with configurable properties in false from ngrx/store
      // after updating packages. This is quick fix, but probably need more investigation here.
      const copyState = Array.from(state);
      copyState.splice(action.payload, 1);
      return [...copyState];

    default:
        return state
  }
}