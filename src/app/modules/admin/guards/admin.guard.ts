import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private readonly store: Store<AppState>,
	 private readonly router: Router,
	 private userService: UserService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let loggedInUser = this.userService.getLoggedInUserDetails();

      if (loggedInUser && loggedInUser.uid && loggedInUser.roles.admin) {
			return true;
		}

		this.router.navigate(['/']);
		return false;
  }

}
