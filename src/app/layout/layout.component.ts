import { Alert } from './../shared/models/alert.model';
import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { AlertsMessagesService } from './../shared/services';

@Component({
  selector: 'wd-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public needNavigation: boolean
  private noNavigationRoutes: Array<string> = [
    'sign-in',
    'sign-up',
    'verify-email',
    'request-password',
    'account/email-verified',
    'account/reset-password',
    'account/invalid-action-code'
  ]

  public alerts: Alert[]

  constructor(
    private router: Router,
    private alertsMessagesService: AlertsMessagesService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        let currentUrl = event.url.substr(1)

        if (currentUrl.indexOf('?') > -1) {
          currentUrl = currentUrl.substr(0, event.url.indexOf('?') - 1)
        }

        if (this.noNavigationRoutes.indexOf(currentUrl) !== -1) {
          this.needNavigation = false
        } else {
          this.needNavigation = true
        }
      }
    })

    this.alertsMessagesService.alerts$.subscribe(alerts => {
      this.alerts = alerts
    })
  }

  ngOnInit() {}

}
