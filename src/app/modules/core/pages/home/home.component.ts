import { Component, OnInit } from '@angular/core';
import { AlertsMessagesService } from './../../../../shared/services';
import { Alert } from './../../../../shared/models';

@Component({
  selector: 'wd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  alerts: Alert[]

  constructor(
    private alertsService: AlertsMessagesService
  ) {
    this.alertsService.alerts$.subscribe((alerts: Alert[]) => {
      this.alerts = alerts
    })
  }

  ngOnInit() {
  }

}
