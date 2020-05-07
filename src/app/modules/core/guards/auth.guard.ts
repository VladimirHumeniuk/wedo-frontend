import { UserService } from 'src/app/shared/services';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './../../../shared/models/user.model';
import { take, map } from 'rxjs/operators';

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
      return this.userService.validateRoles().pipe(
        take(1),
        map(user => {
          if (user) {
            return true
          } else {
            this.router.navigate(['/']);
            return false;
          }
        })
      )
  }
}

@Injectable()
export class IsGuest implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.userService.validateRoles().pipe(
        take(1),
        map(user => {
          if (user) {
            this.router.navigate(['/']);
            return false;
          } else {
            return true
          }
        })
      )
    }
}