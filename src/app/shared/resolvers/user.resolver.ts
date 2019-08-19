import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { first, filter, map, tap } from 'rxjs/operators';
import { User } from '../models';
import { AppState } from '../../app.state';

@Injectable()
export class UserResolver implements Resolve<any> {

  constructor(
    private fireAuth: AngularFireAuth,
    private store: Store<AppState>
  ) { }

  resolve() {
    return this.store.pipe(
      select('user'),
      filter((loaded: boolean) => loaded),
      first()
    )
  }
}