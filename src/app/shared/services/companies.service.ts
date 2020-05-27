import { Injectable } from '@angular/core'
import { Apollo, Query } from 'apollo-angular';
import {
  getCompanyQuery,
  getAllCompaniesQuery,
  assignCompanyMutation,
  removeCompanyMutation
} from '../api/companies.api';
import { BaseApolloService } from './base/base.apollo.service';
import { Observable } from 'rxjs';
import { CompanyCard } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(
    private readonly baseApolloService: BaseApolloService
  ) { }

  public getAllCompanies(): Observable<CompanyCard[]> {
    const source$ = this.baseApolloService.query<{}, CompanyCard[]>(getAllCompaniesQuery, (data) => data.getAllCompanies);
    return source$;
  }

  public getCompany(cid: string): Observable<CompanyCard> {
    const source$ = this.baseApolloService.query<{ cid: string }, CompanyCard>(getCompanyQuery, (data) => data.getCompany, { cid });
    return source$;
  }

  public getUserCompany(cid: string): Observable<CompanyCard> {
    return this.getCompany(cid);
  }

  public assignCompany(userId: string, companyId: string): Observable<boolean> {
    const source$ = this.baseApolloService.mutation<
      {
        userId: string;
        companyId: string;
      },
      boolean
    >(assignCompanyMutation, data => data.assignCompanyMutation, {
      userId,
      companyId
    });

    return source$;
  }

  public removeCompany(cid: string): Observable<boolean> {
    const source$ = this.baseApolloService.mutation<
      {
        cid: string
      },
      boolean
    >(removeCompanyMutation, data => data.removeCompany, {
      cid
    })

    return source$;
  }
}
