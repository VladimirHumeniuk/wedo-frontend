import { NbToastrService } from '@nebular/theme';
import { UserService } from './user.service';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { take, catchError } from 'rxjs/operators'
import { AppState } from './../../app.state';
import { User, Roles } from '../models';
import * as UserActions from 'src/app/store/actions/user.action';
import * as LoginActions from 'src/app/store/actions/login.action';
import { AddAlert } from 'src/app/store/actions/alert.action';
import { ALERTS } from 'src/app/shared/constants';
import { CloudApiService } from './cloud-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly toastrService: NbToastrService,
    private readonly userService: UserService,
    private readonly fireStore: AngularFirestore,
    private readonly fireAuth: AngularFireAuth,
    private readonly router: Router,
    private readonly store: Store<AppState>,
    private readonly cloud: CloudApiService
  ) { }

  public createUserWithEmailAndPassword(formData: any): Promise<void> {
    const {
      email,
      accountType,
      acceptTermsAndConditions,
      password
    } = formData;

    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((response: firebase.auth.UserCredential) => {
        const { uid, emailVerified } = response.user
        const user: User = {
          uid: uid,
          email: email,
          emailVerified: emailVerified,
          accountType: accountType,
          createdAt: new Date(),
          acceptTermsAndConditions: acceptTermsAndConditions,
          roles: {
            readonly: true
          }
        }

        this.cloud.setUserRoles(user.uid, { readonly: true })

        return this.userService.setUserData(user);
      })
      .then(() => this.sendEmailVerification())
      .catch(error => { throw error })
  }

  public sendEmailVerification(): Promise<void> {
    let sendEmailVerification: Promise<void>

    this.fireAuth.user.pipe(
      take(1)
    ).subscribe((user: firebase.User) => {
      const userLink: AngularFirestoreDocument<DocumentData> = this.fireStore.collection('users').doc(user.uid)

      const roles: Roles = {
        readonly: true,
        author: false
      }

      sendEmailVerification = user.sendEmailVerification().then(() => {
        userLink.set({
          emailVerified: false,
          email: user.email,
          roles: roles
        }, { merge: true })
        this.cloud.setUserRoles(user.uid, { ...roles })
        this.store.dispatch(new AddAlert({ uid: user.uid, alert: ALERTS['email-not-verified']}))

        userLink.valueChanges().subscribe((user: User) => {
          this.store.dispatch(new UserActions.SaveUser(user))
        })
      }).then(() => {
        this.router.navigate(['/verify-email'])
      })
    })

    return sendEmailVerification
  }

  public verifyEmail(actionCode: string, uid: string): Promise<void> {
    return this.fireAuth.applyActionCode(actionCode)
      .then(() => {
        const userLink: AngularFirestoreDocument<DocumentData> = this.fireStore.collection('users').doc(uid)

        const roles: Roles = {
          readonly: false,
          author: true
        }
        userLink.set({
          emailVerified: true,
          roles: roles
        }, { merge: true })
        this.cloud.setUserRoles(uid, { ...roles })

        userLink.valueChanges().subscribe((user: User) => {
          this.store.dispatch(new UserActions.SaveUser(user))
        })
      })
      .catch(error => { throw error })
  }

  public checkActionCode(code: string): Promise<firebase.auth.ActionCodeInfo> {
    return this.fireAuth.checkActionCode(code)
      .catch(error => { throw error })
  }

  public sendPasswordResetEmail(email: string): Promise<void> {
    return this.fireAuth.sendPasswordResetEmail(email)
      .catch(error => { throw error })
  }

  public resetPassword(actionCode: string, newPassword: string): Promise<void> {
    return this.fireAuth.confirmPasswordReset(actionCode, newPassword)
      .catch(error => { throw error })
  }

  public signInWithEmailAndPassword(formData: any, pendingCredentials?: any): Promise<void> {
    const { email, password, rememberUser } = formData

    return this.fireAuth.signInWithEmailAndPassword(email, password)
      .then((credentials: firebase.auth.UserCredential) => {
        if (pendingCredentials) {
          credentials.user.linkWithCredential(pendingCredentials)
        }
        return credentials;
      })
      .then(credentials => {
        if(credentials && credentials.user && credentials.user.uid) {
          this.router.navigate(['/'])
        }
      })
      .catch(error => { throw error })
  }

  public signInWithProvider(provider: string): Promise<void> {
    return new Promise<any>(() => {
      const providers = {
        google: new firebase.auth.GoogleAuthProvider(),
        facebook: new firebase.auth.FacebookAuthProvider(),
        twitter: new firebase.auth.TwitterAuthProvider()
      }

      this.fireAuth.signInWithPopup(providers[provider])
      .then((data: firebase.auth.UserCredential) => {
        this.userService.getUser(data.user.uid)
          .pipe(
            catchError(() => {
              data.user.delete();
              this.toastrService.danger('This profile is not linked to any account or this profile does not have an email address associated with any Gib.do account. Please, register or try a different sign-in method.', 'Error', { duration: 15000 })
              this.router.navigate(['/sign-up']);
              return of(null);
            })
          )
          .subscribe((user: any) => {
            if (user) {
              this.store.dispatch(new UserActions.GetUser());
              this.router.navigate(['/']);
            }
          })
       })
      .catch(error => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          const pendingCredentials = error.credential
          const { credential, email } = error

          this.fireAuth.fetchSignInMethodsForEmail(email).then((methods) => {
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
    this.router.navigate(['/'])
    this.store.dispatch(new UserActions.RemoveUser())
    return this.fireAuth.signOut();
  }

  public updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    return this.fireAuth.currentUser.then((user: firebase.User) => {
      if (user) {
        const credentials = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)

        return user.reauthenticateWithCredential(credentials).then(res => {
          if (res) {
            return user.updatePassword(newPassword).catch(err => { throw new Error(err.code) })
          }
        }).catch(err => { throw new Error(err.code) })
      }
    })
  }

  public updateEmail(currentPassword: string, newEmail: string): Promise<void> {
    return this.fireAuth.currentUser.then((user: firebase.User) => {
      if (user) {
        const credentials = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)

        return user.reauthenticateWithCredential(credentials).then(res => {
          if (res) {
            return user.updateEmail(newEmail)
              .then(() => {
                this.sendEmailVerification()
              })
          }
        })
      }
    })
  }

  public removeAccount(currentPassword: string): Promise<void> {
    return this.fireAuth.currentUser.then((user: firebase.User) => {
      if (user) {
        const credentials = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)

        return user.reauthenticateWithCredential(credentials).then(res => {
          if (res) {
            this.store.select('user').pipe(
              take(1)
            ).subscribe(storeUser => {
              if (storeUser.company) {
                this.fireStore.collection('companies').doc(storeUser.company).delete()
              }

              user.delete().then(() => this.signOut())
            })
          }
        })
      }
    })
  }
}
