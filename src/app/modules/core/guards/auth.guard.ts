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
    private readonly userService: UserService
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