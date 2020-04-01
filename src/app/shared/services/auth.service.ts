import { UserService } from './user.service';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'
import { AppState } from './../../app.state';
import { User } from '../models';
import * as UserActions from './../../store/actions/user.action';
import * as LoginActions from './../../store/actions/login.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly fireStore: AngularFirestore,
    private readonly fireAuth: AngularFireAuth,
    private readonly router: Router,
    private readonly store: Store<AppState>
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

  public signInWithEmailAndPassword(formData: any, pendingCredentials?: any): Promise<void> {
    const { email, password, rememberUser } = formData

    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((credentials: firebase.auth.UserCredential) => {
        if (pendingCredentials) {
          credentials.user.linkWithCredential(pendingCredentials)
        }

        this.userService.user$.subscribe((user: User) => {
          if (user) {
            this.router.navigate(['/'])
          }
        })
      })
      .catch(error => { throw error })
  }

  public signInWithFacebook(): Promise<void> {
    return new Promise<any>(() => {
      let provider = new firebase.auth.FacebookAuthProvider();

      this.fireAuth.auth.signInWithPopup(provider)
        .then((data) => {
          this.userService.user$.subscribe((user: User) => {
            if (user.accountType && user.accountType !== "GUEST") {
              this.router.navigate(['/'])
            } else {

            }
          })
         })
        .catch(error => {
          if (error.code === 'auth/account-exists-with-different-credential') {
            const pendingCredentials = error.credential
            const { credential, email } = error

            this.fireAuth.auth.fetchSignInMethodsForEmail(email).then((methods) => {
              if (methods[0] === 'password') {
                const payload = {
                  email: email,
                  credential: credential
                }

                this.store.dispatch(new LoginActions.StartLogin(payload))
                this.router.navigate(['/prompt-password'])
              }
            })
          }

          throw error
        })
    })
  }

  public signOut(): Promise<void> {
    this.store.dispatch(new UserActions.RemoveUser())
    return this.fireAuth.auth.signOut();
  }
}
