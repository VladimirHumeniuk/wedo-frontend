import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userSource: BehaviorSubject<any> = new BehaviorSubject(null)
  public user = this.userSource.asObservable()

  constructor(
    private fireStore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
  ) {
    this.fireAuth.authState.subscribe((user: firebase.User) => {
      this.userSource.next(user)
    })
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

  public verifyEmail(user: User): void {
    console.log(user)
  }

  public sendPasswordResetEmail(email: string): Promise<void> {
    return this.fireAuth.auth.sendPasswordResetEmail(email)
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
