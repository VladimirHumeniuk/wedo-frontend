import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import {
  selectAdminFeatureUsers,
  selectAdminFeatureCompanies
} from 'src/app/store/states/admin.state';
import { Observable } from 'rxjs';
import { User, CompanyCard } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public users$: Observable<User[]> = this.store.select(selectAdminFeatureUsers);
  public companies$: Observable<CompanyCard[]> = this.store.select(selectAdminFeatureCompanies)

  constructor(
    private readonly store: Store<AppState>
  ) { }
}
