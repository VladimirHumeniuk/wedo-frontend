import { REMOVE_ALERT, GET_ALL_ALERTS, GetAllAlertsError } from './../actions/alert.action';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AlertsMessagesService } from 'src/app/shared/services';

import {
  AddAlert,
  AddAlertSuccess,
  AddAlertError,
  RemoveAlert,
  RemoveAlertSuccess,
  RemoveAlertError,
  GetAllAlerts,
  GetAllAlertsSuccess,
  ADD_ALERT
} from 'src/app/store/actions/alert.action';

@Injectable()
export class AlertEffects {
  constructor(
    private readonly actions: Actions,
    private readonly alertsMessagesService: AlertsMessagesService
  ) {}

  @Effect()
  addAlert$: Observable<Action> = this.actions.pipe(
    ofType(ADD_ALERT),
    switchMap((action: AddAlert) =>
      this.alertsMessagesService
        .addAlert(action.payload.uid, action.payload.alert)
        .pipe(
          map(_ => ({ alert: action.payload.alert, uid: action.payload.uid }))
        )
    ),
    switchMap(({ alert, uid }) => [
      new AddAlertSuccess(alert),
      new GetAllAlerts({ uid })
    ]),
    catchError(x => of(new AddAlertError()))
  );

  @Effect()
  removeAlert$: Observable<Action> = this.actions.pipe(
    ofType(REMOVE_ALERT),
    switchMap((action: RemoveAlert) =>
      this.alertsMessagesService
        .removeAlert(action.payload.code, action.payload.uid)
        .pipe(
          map(_ => ({ code: action.payload.code, uid: action.payload.uid }))
        )
    ),
    switchMap(({ code, uid }) => [
      new RemoveAlertSuccess({ code }),
      new GetAllAlerts({ uid })
    ]),
    catchError(x => of(new RemoveAlertError()))
  );

  @Effect()
  getAllAlert$: Observable<Action> = this.actions.pipe(
    ofType(GET_ALL_ALERTS),
    switchMap((action: GetAllAlerts) =>
      this.alertsMessagesService.getAlerts(action.payload.uid)
    ),
    map(alerts => new GetAllAlertsSuccess({ alerts })),
    catchError(x => of(new GetAllAlertsError()))
  );
}
