import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { map } from "rxjs/operators";
import { AppState } from 'src/app/app.state';
import { User } from './../models/user.model';
import { CompanyCard } from '../models';

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

  public assignCompany(uid: string, companyId: string): Promise<void> {
    const userRef = this.fireStore.collection('users').doc(uid)
    const companyRef = this.fireStore.collection('companies').doc(companyId)

    const updateUser = userRef.set({ company: companyId }, { merge: true })
    const updateCompany = companyRef.set({ cid: companyId }, { merge: true })

    return updateUser && updateCompany
  }

  public getUserCompany(cid: string): Observable<CompanyCard> {
    const source$ = from(this.fireStore.collection('companies').doc(cid).ref.get())
      .pipe(map((data: firebase.firestore.DocumentSnapshot) => {
        return data.data() as CompanyCard
      }));
    return source$
  }
}
