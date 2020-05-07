import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { map } from 'rxjs/operators';
import { Roles } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CloudApiService {

  constructor(
    private cloud: AngularFireFunctions
  ) { }

  public getUserByEmail(email: string): Promise<any> {
    return this.cloud.httpsCallable('getUserByEmail')({ email: email })
      .toPromise()
      .catch(error => { throw error })
  }

  public setUserRoles(uid: string, roles: Roles): Promise<any> {
    return this.cloud.httpsCallable('setUserRoles')({ uid: uid, roles: roles })
      .toPromise()
      .catch(error => { throw error })
  }
}
