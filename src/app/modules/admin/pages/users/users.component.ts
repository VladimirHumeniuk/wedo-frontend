import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, CountersService } from 'src/app/shared/services';
import { User } from 'src/app/shared/models';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap, takeUntil } from 'rxjs/operators';
import { AdminService } from 'src/app/shared/services/admin.service';
import { SafeComponent } from 'src/app/shared/helpers';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { GetAllUsers } from 'src/app/store/actions/user.action';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'wd-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends SafeComponent implements OnInit {

  public tableColumns = [
    { title: 'ID', key: 'uid', options: { code: true } },
    { title: 'Email', key: 'email' },
    { title: 'Type', key: 'accountType' },
    { title: 'Company', key: 'company', options: { code: true } },
    { title: 'Created', key: 'createdAt', options: { date: true } }
  ];

  public actions = { edit: true };
  public users: User[];
  public loading: boolean;

  public itemsPerPage: number = 10;

  constructor(
    private readonly fireStore: AngularFirestore,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly store: Store<AppState>,
    private readonly countersService: CountersService
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
    this.loading = true
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
        tap(users => {
          this.loading = false
          this.users = users
        })
      ).subscribe();
  }

}
