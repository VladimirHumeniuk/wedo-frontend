import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './../../app.state';
import * as AlertActions from './../../actions/alert.action';
import * as firebase from 'firebase/app';
import { User, Alert } from '../models';
import { ALERTS } from './../constants/alerts';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AlertsMessagesService {

  public alerts$: Observable<Alert[]> = this.store.select('alert')
  private alerts: Alert[]
  private uid: string

  constructor(
    private userService: UserService,
    private fireStore: AngularFirestore,
    private store: Store<AppState>
  ) {
    this.alerts$.subscribe((alerts: Alert[]) => {
      this.alerts = alerts
    })

    this.userService.user$.subscribe((user: User) => {
      if (user) {
        const { uid, emailVerified } = user

        this.uid = uid

        this.fireStore.collection('alerts').doc(uid).valueChanges()
          .subscribe((alerts: Alert[]) => {
            if ((!alerts || !alerts['email-not-verified']) && !emailVerified) {
              this.addAlert(uid, ALERTS['email-not-verified'])
            }

            if (alerts) {
              for (let i in alerts) {
                if (this.alerts.length > 0) {
                  this.alerts.forEach((j: Alert) => {
                    if (i === j.code) return
                  })
                } else {
                  this.store.dispatch(new AlertActions.AddAlert(alerts[i]))
                }
              }
            }
         })
      }
    })
  }

  public addAlert(uid: string, alert: Alert): Promise<void> {
    return this.fireStore.collection('alerts').doc(uid)
      .set({
        [alert.code]: alert
      }, { merge: true })
  }

  public removeAlert(index: number, code: string): void {
    this.fireStore.collection('alerts').doc(this.uid)
      .update({[code.toString()]: firebase.firestore.FieldValue.delete()})
      .then(() => {
        this.store.dispatch(new AlertActions.RemoveAlert(index))
      })
  }

}
