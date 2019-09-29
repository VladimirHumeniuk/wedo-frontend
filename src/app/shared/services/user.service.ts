import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { BaseApolloService } from 'src/app/modules/core/services/base/base.apollo.service';
import { User } from 'firebase';
import { getAllUsersQuery, getUserQuery, getCompanyQuery, getAllCompaniesQuery, assignCompanyMutation } from './user.api';
import { Observable } from 'rxjs/Observable';
import { CompanyCard } from '../models';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user$ = this.store.select('user');

  constructor(
    private readonly baseApolloService: BaseApolloService,
    private readonly fireAuth: AngularFireAuth,
    private store: Store<AppState>
    ) {
  }

  public getAllUsers(): Observable<User[]> {
    const source = this.baseApolloService.query<{}, User[]>(getAllUsersQuery, (data) => data.getAllUsers);
    return source;
  }

  public getUser(uid: string): Observable<User> {
    const source = this.baseApolloService.query<{ uid: string }, User>(getUserQuery, (data) => data.getUser, { uid });
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

  public getAuth(): Observable<{ uid: string }> {
    const source$ = this.fireAuth.authState as Observable<{uid: string}>;
    return source$;
  }
}
