import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppState } from './../../app.state';
import { AlertsMessagesService } from './alerts-messages.service';
import { User } from './../models/user.model';
import * as UserActions from './../../actions/user.action';
import { ALERTS } from '../constants/index'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: Observable<User> = this.store.select('user')

  constructor(
    private fireStore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private alertsMessageService: AlertsMessagesService,
    private store: Store<AppState>
  ) {
    this.fireAuth.authState.subscribe((auth: firebase.User) => {
      if (auth) {
        const { uid } = auth

        this.fireStore.collection('users').doc(uid).ref.get()
        .then((data: firebase.firestore.DocumentSnapshot) => {
          const user = data.data() as User

          if (user.emailVerified && !user.alerts['user/email-not-verified']) {
            this.fireStore.collection('users').doc(`${user.uid}`)
            .set({alerts: {
              'user/email-not-verified': ALERTS.user['email-not-verified']
            }}, { merge: true })
          }

          this.store.dispatch(new UserActions.SaveUser(user))
        })
      } else {
        this.store.dispatch(new UserActions.RemoveUser())
      }
    })
  }
}
