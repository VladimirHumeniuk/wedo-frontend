import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models';
import { SafeComponent } from 'src/app/shared/helpers';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'wd-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent extends SafeComponent implements OnInit {

  public user$: Observable<User> = this.store.select('user');
  public user: User;

  constructor(
    private readonly store: Store<AppState>,
  ) {
    super();
  }

  ngOnInit(): void {
    this.user$.pipe(
      takeUntil(this.unsubscriber),
      tap(user => this.user = user)
    ).subscribe()
  }

}
