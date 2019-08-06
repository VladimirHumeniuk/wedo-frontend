import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private fireAuth: AngularFireAuth
  ) { }

  public getCurrentUser(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let user = this.fireAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

}
