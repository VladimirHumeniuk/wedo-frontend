import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireStore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
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
    } = formData

    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((response: firebase.auth.UserCredential) => {
        const user: User = {
          uid: response.user.uid,
          email: email,
          emailVerified: response.user.emailVerified,
          accountType: accountType,
          acceptTermsAndConditions: acceptTermsAndConditions
        }

        this.sendEmailVerification()
        this.setUserData(user)

        this.ngZone.run(() => {
          this.router.navigate(['/'])
        })
      }).catch(error => { throw error })
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
        const userLink: AngularFirestoreDocument<DocumentData> = this.fireStore.doc(`users/${uid}`)

        userLink.set({
          emailVerified: true
        }, { merge: true })
      })
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
        this.ngZone.run(() => {
          this.router.navigate(['/verify-email'])
        })
      }).catch(error => { throw error })
  }

  public signOut(): Promise<void> {
    return this.fireAuth.auth.signOut()
      .then(() => {
        this.ngZone.run(() => {
          this.router.navigate(['/'])
        })
      })
  }
}
