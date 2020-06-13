import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { BaseApolloService } from 'src/app/shared/services/base/base.apollo.service';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { getAllUsersQuery, getUserQuery } from '../api/user.api';
import { Observable } from 'rxjs/Observable';
import { User, CompanyCard, Roles } from '../models';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map } from 'rxjs/operators';
import { CloudApiService } from './cloud-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user$ = this.store.pipe(
    select('user')
  );

  constructor(
    private readonly fireStore: AngularFirestore,
    private readonly baseApolloService: BaseApolloService,
    private readonly fireAuth: AngularFireAuth,
    private readonly store: Store<AppState>,
    private readonly cloud: CloudApiService
  ) { }

  public getAllUsers(): Observable<User[]> {
    const source = this.baseApolloService.query<{}, User[]>(
      getAllUsersQuery,
      (data) => data.getAllUsers);
    return source;
  }

  public getUser(uid: string): Observable<User> {
    const source = this.baseApolloService.query<{ uid: string }, User>(
      getUserQuery,
      (data) => data.getUser,
      { uid });
    return source;
  }

  public setUserData(user: User): Promise<any[]> {
    const { uid, roles, username } = user
    const userLink: AngularFirestoreDocument<DocumentData> = this.fireStore.doc(`users/${uid}`)

    const promises: any[] = [
      userLink.set(user, { merge: true })
    ]

    if (roles) {
      promises.push(this.cloud.setUserRoles(uid, roles))
    }

    if (username) {
      promises.push(this.fireAuth.currentUser.then(user => {
        user.updateProfile({
          displayName: username
        })
      }))
    }

    return Promise.all(promises)
  }

  public validateRoles(): Observable<Roles> {
    return this.fireAuth.idTokenResult.pipe(
      take(1),
      map(response => {
        if (response && response.claims) {
          const { readonly, admin, author } = response.claims;

          const roles: Roles = { readonly, admin, author };

          return roles
        }
      })
    )
  }

  public getAuth(): Observable<{ uid: string }> {
    const source$ = this.fireAuth.authState.pipe(take(1)) as Observable<{uid: string}>;
    return source$;
  }
}
