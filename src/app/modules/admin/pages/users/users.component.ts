import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/services';
import { User } from 'src/app/shared/models';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take, map, tap, takeUntil } from 'rxjs/operators';
import { AdminService } from 'src/app/shared/services/admin.service';
import { SafeComponent } from 'src/app/shared/helpers';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { GetAllUsers } from 'src/app/store/actions/user.action';

@Component({
  selector: 'wd-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends SafeComponent implements OnInit, OnDestroy {

  public tableColumns = [
    { title: 'uid', key: 'uid', options: { code: true } },
    { title: 'email', key: 'email' },
    { title: 'type', key: 'accountType' },
    { title: 'company', key: 'company', options: { code: true } },
    { title: 'created', key: 'createdAt', options: { date: true } }
  ]
  public actions = { edit: true }
  public users: any[]
  private _users: Subscription

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly store: Store<AppState>,
  ) {
    super();
  }

  public editUser(uid: string): void {
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute,
      queryParams: { uid }
    })
  }

  ngOnInit() {
    this.store.dispatch(new GetAllUsers())
    this.adminService.users$
      .pipe(
        takeUntil(this.unsubscriber),
        map((data: User[]) => {
          const users: User[] = [...data.map(user => ({...user}))]

          users.forEach((user: User) => {
            if ('_seconds' in user.createdAt) {
              user.createdAt = new Date(user.createdAt._seconds * 1000)
            }
          })

          return users;
        }),
        tap(users => this.users = users)
      ).subscribe();
  }

}
