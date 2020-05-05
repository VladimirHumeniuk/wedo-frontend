import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { BaseApolloService } from 'src/app/shared/services/base/base.apollo.service';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { getAllUsersQuery, getUserQuery, getCompanyQuery, getAllCompaniesQuery, assignCompanyMutation } from '../api/user.api';
import { Observable } from 'rxjs/Observable';
import { User, CompanyCard } from '../models';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user$ = this.store.select('user');

  constructor(
    private readonly fireStore: AngularFirestore,
    private readonly baseApolloService: BaseApolloService,
    private readonly fireAuth: AngularFireAuth,
    private readonly store: Store<AppState>
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

  public getAllCompanies(): Observable<CompanyCard[]> {
    const source = this.baseApolloService.query<{}, CompanyCard[]>(getAllCompaniesQuery, (data) => data.getAllCompanies);
    return source;
  }

  public getCompany(cid: string): Observable<CompanyCard> {
    const source = this.baseApolloService.query<{ cid: string }, CompanyCard>(getCompanyQuery, (data) => data.getCompany, { cid });
    return source;
  }

  public getUserCompany(cid: string): Observable<CompanyCard> {
    return this.getCompany(cid);
  }

  public assignCompany(userId: string, companyId: string): Observable<boolean> {
    const source = this.baseApolloService.mutation<{
      userId: string,
      companyId: string
    }, boolean>(assignCompanyMutation, (data) => data.assignCompanyMutation, {
      userId,
      companyId
    });
    return source;
  }

  public setUserData(user: User): Promise<void> {
    const userLink: AngularFirestoreDocument<DocumentData> = this.fireStore.doc(`users/${user.uid}`)

    return userLink.set(user, { merge: true })
  }

  public getAuth(): Observable<{ uid: string }> {
    const source$ = this.fireAuth.authState.pipe(take(1)) as Observable<{uid: string}>;
    return source$;
  }

  public getLoggedInUserDetails() {
	  return JSON.parse(localStorage.getItem('user'));
  }
}
