import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Alert, User } from './../../models';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { RemoveAlert } from 'src/app/store/actions/alert.action';
import { UserService } from 'src/app/shared/services';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wd-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit, OnDestroy {
  @Input() alert: Alert;
  @Input() index: number;

  private uid: string;
  private _user: Subscription;

  constructor(
    private readonly userService: UserService,
    private readonly store: Store<AppState>,
    ) {}

  ngOnDestroy() {
    this._user.unsubscribe()
  }

  ngOnInit() {
    this._user = this.userService.user$.pipe(
      tap((user: User) => this.uid = user.uid)
    ).subscribe();
  }

  public close(): void {
    this.store.dispatch(new RemoveAlert({uid: this.uid, code: this.alert.code}));
  }
}
