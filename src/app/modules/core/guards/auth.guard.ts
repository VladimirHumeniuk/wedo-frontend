import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './../../../shared/models/user.model';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class isUser implements CanActivate {
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.fireAuth.authState.pipe(
        take(1),
        map(authState => {
          if (authState) {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
        })
      )
  }
}

@Injectable({
  providedIn: 'root'
})
export class isGuest implements CanActivate {
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.fireAuth.authState.pipe(
        take(1),
        map(authState => {
          if (authState) {
            this.router.navigate(['/']);
            return false;
          } else {
            return true;
          }
        })
      )
  }
}