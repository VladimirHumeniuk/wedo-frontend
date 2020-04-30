import { UserService } from 'src/app/shared/services';
import { AuthService } from 'src/app/shared/services';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import { User } from './../../../shared/models/user.model';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Injectable({
  providedIn: 'root'
})
export class IsUser implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user

      this.userService.user$.subscribe((data: User) => {
        user = data.accountType && data.accountType !== "GUEST"
      })

      if (!user) this.router.navigate(['/'])

      return !!user
  }
}

@Injectable()
export class IsGuest implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let guest

      this.userService.user$.subscribe((data: User) => {
        guest = data.accountType === "GUEST" || !data.accountType
      })

      if (!guest) this.router.navigate(['/'])

      return !!guest
  }
}

@Injectable()
export class IsLogged implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly store: Store<AppState>,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.getCurrentUser()
    // if it was successful, we can return Observable.of(true)
    .switchMap(() => of(true))
    // otherwise, something went wrong
    .catch(() => of(false));

  }

  getCurrentUser(): Observable<any> {

    // return an Observable stream from the store
    return this.store.select('user')
      .do((data: User) => {
        if (data.accountType !== "GUEST") {
          this.router.navigate(['/'])
        }
      })
      .take(1);
  }
}

