import { Injectable } from '@angular/core';
import { BaseApolloService } from 'src/app/modules/core/services-apollo/base/base.apollo.service';
import { Observable } from 'rxjs/Observable';
import { Alert, User } from '../models';
import { getAllAlertsQuery, addAlertMutation, removeAlertMutation } from './alerts-messages.api';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UserApolloService } from './user.apollo.service';
import { ALERTS } from './../constants/alerts';
import * as AlertActions from './../../store/actions/alert.action';

@Injectable({
  providedIn: 'root'
})
export class AlertsMessagesApolloService {
  public alerts$: Observable<Alert[]> = this.store.select('alert');
  private alerts: Alert[];
  private uid: string;

  constructor(
    private readonly baseApolloService: BaseApolloService,
    private readonly userApolloService: UserApolloService,
    private readonly store: Store<AppState>,

    ) {
      this.alerts$.subscribe((alerts: Alert[]) => {
        this.alerts = alerts;
      });

      this.userApolloService.user$.subscribe((user: User) => {
        if (user && user.uid) {
          const { uid, emailVerified } = user;

          this.uid = uid;

          this.getAllAlerts().subscribe((alerts) => {
            if ((!alerts || alerts && !alerts['email-not-verified']) && !emailVerified) {
              this.addAlert(uid, ALERTS['email-not-verified']);
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

  public getAllAlerts(): Observable<Alert[]> {
    const source = this.baseApolloService.query<{}, Alert[]>(getAllAlertsQuery, (data) => data.getAllAlerts);
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

  public removeAlert(code: string, uid: string): Observable<Alert> {
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
      );
    return source;
  }
}
