import { Injectable } from '@angular/core';
import { BaseApolloService } from 'src/app/shared/services/base/base.apollo.service';
import { Observable } from 'rxjs/Observable';
import { Alert, AlertData } from '../models';
import {
  getAllAlertsQuery,
  addAlertMutation,
  removeAlertMutation,
  getAlertsQuery
} from './alerts-messages.api';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UserService } from './user.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertsMessagesService {
  public alerts$: Observable<Alert[]> = this.store
    .select('alert')
    .pipe(map(x => x.alerts));

  constructor(
    private readonly baseApolloService: BaseApolloService,
    private readonly store: Store<AppState>
  ) {}

  public getAllAlerts(): Observable<AlertData[]> {
    const source = this.baseApolloService.query<{}, AlertData[]>(
      getAllAlertsQuery,
      data => data.getAllAlerts
    );
    return source;
  }

  public getAlerts(uid: string): Observable<Alert[]> {
    const source = this.baseApolloService.query<
      {
        uid: string;
      },
      Alert[]
    >(getAlertsQuery, data => data.getAlerts, {
      uid
    }, { query: getAlertsQuery , fetchPolicy: 'network-only'})
    return source;
  }

  public addAlert(uid: string, alert: Alert): Observable<boolean> {
    const source = this.baseApolloService.mutation<
      {
        uid: string;
        alert: Alert;
      },
      boolean
    >(addAlertMutation, data => data.addAlert, {
      uid,
      alert
    });
    return source;
  }

  public removeAlert(code: string, uid: string): Observable<boolean> {
    const source = this.baseApolloService.mutation<
      {
        code: string;
        uid: string;
      },
      boolean
    >(removeAlertMutation, data => data.removeAlert, {
      uid,
      code
    });
    return source;
  }
}
