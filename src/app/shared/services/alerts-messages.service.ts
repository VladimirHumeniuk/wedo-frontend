import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './../../app.state';
import { Alert } from './../models';
import * as AlertActions from './../../actions/alert.action';

@Injectable({
  providedIn: 'root'
})
export class AlertsMessagesService {

  alerts$: Observable<Alert[]> = this.store.select('alert')

  constructor(
    private store: Store<AppState>
  ) { }

  public addAlert(alert: Alert): void {
    this.store.select('alert').subscribe(alerts => {
      if (alerts.some(a => a.message == alert.message)) {
        return
      } else {
        this.store.dispatch(new AlertActions.AddAlert(alert))
      }
    }).unsubscribe()
  }

  public removeAlert(index: number): void {
    this.store.dispatch(new AlertActions.RemoveAlert(index))
  }

}
