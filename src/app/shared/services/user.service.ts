import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppState } from './../../app.state';
import { User } from './../models/user.model';
import * as UserActions from './../../store/actions/user.action';
import { ALERTS } from '../constants'
import { from } from 'rxjs';
import { map, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public user$ = this.store.select('user');

    constructor(
        private fireStore: AngularFirestore,
        private fireAuth: AngularFireAuth,
        private store: Store<AppState>
    ) {
    }

    public getUser(uid: string): Observable<User> {
        const source$ = from(this.fireStore.collection('users').doc(uid).ref.get())
            .pipe(map((data: firebase.firestore.DocumentSnapshot) => data.data() as User));
        return source$;
    }

    public getAuth(): Observable<{ uid: string }> {
        const source$ = this.fireAuth.authState as Observable<{uid: string}>;
        return source$;
    }
}
