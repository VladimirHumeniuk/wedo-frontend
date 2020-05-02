import { UserService } from 'src/app/shared/services';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './../../../shared/models/user.model';

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
      let loggedInUser = this.userService.getLoggedInUserDetails();

      if (loggedInUser && loggedInUser.uid) {
			return true;
		}

		this.router.navigate(['/']);
		return false;
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
      let loggedInUser = this.userService.getLoggedInUserDetails();

      if (loggedInUser && loggedInUser.uid) {
			this.router.navigate(['/']);
			return false;
		}

      return true;
  }
}