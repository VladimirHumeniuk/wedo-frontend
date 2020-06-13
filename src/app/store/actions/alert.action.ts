import { Action } from '@ngrx/store';
import { Alert } from './../../shared/models';

export const ADD_ALERT = '[ALERT] Add Alert';
export const ADD_ALERT_SUCCESS = '[ALERT] Add Alert Succes';
export const ADD_ALERT_ERROR = '[ALERT] Add Alert Error';

export const REMOVE_ALERT = '[ALERT] Remove';
export const REMOVE_ALERT_SUCCESS = '[ALERT] Remove Alert Success';
export const REMOVE_ALERT_ERROR = '[ALERT] Remove Alert Error';

export const GET_ALL_ALERTS = '[ALERT] Get All Alerts';
export const GET_ALL_ALERTS_SUCCESS = '[ALERT] Get All Alert Success';
export const GET_ALL_ALERTS_ERROR = '[ALERT] Get All Alert Error';

export class AddAlert implements Action {
  readonly type = ADD_ALERT;

  constructor(public payload: { uid: string; alert: Alert }) {}
}

export class AddAlertSuccess implements Action {
  readonly type = ADD_ALERT_SUCCESS;

  constructor(public payload: Alert) {}
}

export class AddAlertError implements Action {
  readonly type = ADD_ALERT_ERROR;
  constructor() {}
}

export class RemoveAlert implements Action {
  readonly type = REMOVE_ALERT;

  constructor(public payload: { uid: string; code: string }) {}
}

export class RemoveAlertSuccess implements Action {
  readonly type = REMOVE_ALERT_SUCCESS;

  constructor(public payload: { code: string }) {}
}

export class RemoveAlertError implements Action {
  readonly type = REMOVE_ALERT_ERROR;
  constructor() {}
}

export class GetAllAlerts implements Action {
  readonly type = GET_ALL_ALERTS;

  constructor(public payload: { uid: string; }) {}
}
export class GetAllAlertsSuccess implements Action {
  readonly type = GET_ALL_ALERTS_SUCCESS;

  constructor(public payload: { alerts: Alert[] }) {}
}

export class GetAllAlertsError implements Action {
  readonly type = GET_ALL_ALERTS_ERROR;
  constructor() {}
}

export type Actions =
  | AddAlert
  | AddAlertSuccess
  | AddAlertError
  | RemoveAlert
  | RemoveAlertSuccess
  | RemoveAlertError
  | GetAllAlerts
  | GetAllAlertsSuccess
  | GetAllAlertsError;
