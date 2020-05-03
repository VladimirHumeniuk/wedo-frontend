import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/services';
import { User } from 'src/app/shared/models';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'wd-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

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
    public readonly userService: UserService
  ) { }

  public editUser(uid: string): void {
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute,
      queryParams: { uid }
    })
  }

  ngOnDestroy() {
    this._users.unsubscribe()
  }

  ngOnInit() {
    this._users = this.userService.getAllUsers()
      .pipe(
        take(1),
        map((data: User[]) => {
          let users = [...data]

          users.forEach((user: User) => {
            if ('_seconds' in user.createdAt) {
              user.createdAt = new Date(user.createdAt._seconds * 1000)
            }
          })

          return users
        })
      )
      .subscribe((users: User[]) => {
        this.users = users
      })
  }

}
