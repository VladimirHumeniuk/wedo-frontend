import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserService, AlertsMessagesService } from './../../../../shared/services';
import { User, Alert } from './../../../../shared/models';
import { AppState } from './../../../../app.state';

@Component({
  selector: 'wd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User
  alerts: Alert[]

  constructor(
    private store: Store<AppState>,
    private userService: UserService,
    private alertsService: AlertsMessagesService
  ) {
    this.userService.user$.subscribe((user: User) => {
      this.user = user
    })

    this.alertsService.alerts$.subscribe((alerts: Alert[]) => {
      this.alerts = alerts
    })
  }

  ngOnInit() {
  }

}
