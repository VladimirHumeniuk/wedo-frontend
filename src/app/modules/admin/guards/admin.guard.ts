import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let admin: boolean

      this.store.select('user').pipe(
        take(1)
      ).subscribe((user: User) => admin = user.roles.admin)

    if (!admin) this.router.navigate(['/'])

    return admin
  }

}
