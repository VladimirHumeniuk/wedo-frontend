import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { map } from "rxjs/operators";
import { AppState } from 'src/app/app.state';
import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user$ = this.store.select('user');

  constructor(
    private fireStore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private store: Store<AppState>
  ) {}

  public getUser(uid: string): Observable<User> {
    const source$ = from(this.fireStore.collection('users').doc(uid).ref.get())
      .pipe(map((data: firebase.firestore.DocumentSnapshot) => {
        return data.data() as User
      }));
    return source$
  }

  public getAuth(): Observable<{ uid: string }> {
    const source$ = this.fireAuth.authState as Observable<{uid: string}>;
    return source$;
  }
}
