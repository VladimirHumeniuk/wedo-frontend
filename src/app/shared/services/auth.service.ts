import { UserService } from './user.service';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'
import { AppState } from './../../app.state';
import { User } from '../models';
import * as UserActions from './../../store/actions/user.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService,
    private fireStore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private store: Store<AppState>
  ) { }

  public getCurrent(): Observable<firebase.User> {
    return this.fireAuth.user.pipe(take(1))
  }

  public createUserWithEmailAndPassword(formData: any): Promise<void> {
    const {
      email,
      accountType,
      acceptTermsAndConditions,
      password
    } = formData;

    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((response: firebase.auth.UserCredential) => {
        const user: User = {
          uid: response.user.uid,
          email: email,
          emailVerified: response.user.emailVerified,
          accountType: accountType,
          createdAt: new Date(),
          acceptTermsAndConditions: acceptTermsAndConditions
        }

        return this.setUserData(user);
      })
      .then(() => this.sendEmailVerification())
      .catch(error => { throw error })
  }

  private setUserData(user: User): Promise<void> {
    const userLink: AngularFirestoreDocument<DocumentData> = this.fireStore.doc(`users/${user.uid}`)

    return userLink.set(user, { merge: true })
  }

  public sendEmailVerification(): Promise<void> {
    return this.fireAuth.auth.currentUser.sendEmailVerification()
  }

  public verifyEmail(actionCode: string, uid: string): Promise<void> {
    return this.fireAuth.auth.applyActionCode(actionCode)
      .then(() => {
        const userLink: AngularFirestoreDocument<DocumentData> = this.fireStore.collection('users').doc(uid)

        userLink.set({
          emailVerified: true
        }, { merge: true })

        userLink.valueChanges().subscribe((user: User) => {
          this.store.dispatch(new UserActions.SaveUser(user))
        })
      })
      .catch(error => { throw error })
  }

  public checkActionCode(code: string): Promise<firebase.auth.ActionCodeInfo> {
    return this.fireAuth.auth.checkActionCode(code)
      .catch(error => { throw error })
  }

  public sendPasswordResetEmail(email: string): Promise<void> {
    return this.fireAuth.auth.sendPasswordResetEmail(email)
      .catch(error => { throw error })
  }

  public updatePassword(actionCode: string, newPassword: string): Promise<void> {
    return this.fireAuth.auth.confirmPasswordReset(actionCode, newPassword)
      .catch(error => { throw error })
  }

  public signInWithEmailAndPassword(formData: any): Promise<void> {
    const { email, password, rememberUser } = formData

    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.userService.user$.subscribe((user: User) => {
          if (user) {
              this.router.navigate(['/'])
          }
        })
      })
      .catch(error => { throw error })
  }

  public signOut(): Promise<void> {
    console.log("blobl");
    this.store.dispatch(new UserActions.RemoveUser())
    return this.fireAuth.auth.signOut();
  }

  public deleteUser() {
    this.fireAuth.auth.currentUser.delete()
    this.fireStore.collection('users').doc(this.fireAuth.auth.currentUser.uid).delete()
    this.fireStore.collection('alerts').doc(this.fireAuth.auth.currentUser.uid).delete()
  }
}
