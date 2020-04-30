import { Alert } from '../../shared/models';
import * as AlertActions from '../actions/alert.action';
import { AlertState } from 'src/app/store/states/alert.state';

export function alertReducer(
  state: AlertState = new AlertState(),
  action: AlertActions.Actions
) {
  switch (action.type) {
    case AlertActions.ADD_ALERT: {
      return { ...state, loading: true, error: null };
    }

    case AlertActions.ADD_ALERT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        alerts: [...state.alerts, action.payload]
      };
    }

    case AlertActions.ADD_ALERT_ERROR: {
      return {
        ...state,
        loading: false,
        error: 'Alert is not added',
      }
    }

    case AlertActions.REMOVE_ALERT: {
      return { ...state, loading: true, error: null };
    }

    case AlertActions.REMOVE_ALERT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        alerts: [...state.alerts.filter(x => x.code === action.payload.code)]
      };
    }

    case AlertActions.REMOVE_ALERT_ERROR: {
      return {
        ...state,
        loading: false,
        error: 'Alert is not removed',
      }
    }

    case AlertActions.GET_ALL_ALERTS: {
      return { ...state, loading: true, error: null };
    }

    case AlertActions.GET_ALL_ALERTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        alerts: [...action.payload.alerts]
      };
    }

    case AlertActions.GET_ALL_ALERTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: 'All Alerts are not fetched',
      }
    }

    default:
      return state;
  }
}
