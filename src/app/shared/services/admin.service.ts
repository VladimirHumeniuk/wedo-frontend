import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectAdminFeatureUsers } from 'src/app/store/states/admin.state';
import { Observable } from 'rxjs';
import { User, Category } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public users$: Observable<User[]> = this.store.select(selectAdminFeatureUsers);

  constructor(
    private readonly store: Store<AppState>
  ) { }
}
