import { Component, Input, OnInit } from '@angular/core';
import { Alert } from './../../models';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import {RemoveAlert} from 'src/app/store/actions/alert.action';
import {UserService} from 'src/app/shared/services';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'wd-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {
  @Input() alert: Alert;
  @Input() index: number;
  private uid: string;

  constructor(
    private readonly userService: UserService,
    private readonly store: Store<AppState>,
    ) {}

  ngOnInit(): void {
    this.userService.user$.pipe(
      tap(user => this.uid = user.uid)
    ).subscribe();
  }

  public close(): void {
    this.store.dispatch(new RemoveAlert({uid: this.uid, code: this.alert.code}));
  }
}
