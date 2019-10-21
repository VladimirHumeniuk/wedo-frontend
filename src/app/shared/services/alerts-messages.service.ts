import { Injectable } from '@angular/core';
import { BaseApolloService } from 'src/app/modules/core/services/base/base.apollo.service';
import { Observable } from 'rxjs/Observable';
import { Alert, User, AlertData } from '../models';
import { getAllAlertsQuery, addAlertMutation, removeAlertMutation, getAlertsQuery } from './alerts-messages.api';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UserService } from './user.service';
import { ALERTS } from './../constants/alerts';
import * as AlertActions from './../../store/actions/alert.action';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertsMessagesService {
  public alerts$: Observable<Alert[]> = this.store.select('alert');
  private alerts: Alert[];
  private uid: string;

  constructor(
    private readonly baseApolloService: BaseApolloService,
    private readonly userService: UserService,
    private readonly store: Store<AppState>,

    ) {
      this.alerts$.subscribe((alerts: Alert[]) => {
        this.alerts = alerts;
      });

      this.userService.user$.subscribe((user: User) => {
        if (user && user.uid) {
          const { uid, emailVerified } = user;

          this.uid = uid;

          this.getAlerts(uid).subscribe((alertsArray) => {

            const alerts = alertsArray.reduce((obj, item) => Object.assign(obj, { [item.code]: item }), {});

            if ((!alerts || alerts && !alerts['email-not-verified']) && !emailVerified) {
              console.log('emailVerified', emailVerified);
              this.addAlert(uid, ALERTS['email-not-verified']).subscribe();
            }

            if (alerts) {
              for (let i in alerts) {
                if (this.alerts.length > 0) {
                  this.alerts.forEach((j: Alert) => {
                    if (i === j.code) return;
                  })
                } else {
                  this.store.dispatch(new AlertActions.AddAlert(alerts[i]));
                }
              }
            }
          })
         }
      });
  }

  public getAllAlerts(): Observable<AlertData[]> {
    const source = this.baseApolloService.query<{}, AlertData[]>(getAllAlertsQuery, (data) => data.getAllAlerts);
    return source;
  }

  public getAlerts(uid: string): Observable<Alert[]> {
    const source = this.baseApolloService.query<{
      uid: string
    }, Alert[]>(
      getAlertsQuery,
      (data) => data.getAlerts, {
      uid
    });
    return source;
  }

  public addAlert(uid: string, alert: Alert): Observable<Alert> {
    const source = this.baseApolloService.mutation<{
      uid: string,
      alert: Alert
    }, Alert>(
      addAlertMutation,
      (data) => data.addAlert,
      {
        uid,
        alert
      }
    );
    return source;
  }

  public removeAlert(code: string, uid: string = this.uid): Observable<Alert> {
    const source = this.baseApolloService.mutation<{
      code: string,
      uid: string
    }, Alert>(
      removeAlertMutation,
      (data) => data.removeAlert,
      {
        uid,
        code
      }
      ).pipe(
        tap(x => {
          this.alerts.forEach((alert: Alert, index: number) => {
            if (alert.code === code) {
              this.store.dispatch(new AlertActions.RemoveAlert(index));
            }
          });
        })
      );
    return source;
  }
}
