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

  public accountRouters: boolean
  private accountRoutersLinks: Array<string> = [
    'sign-in',
    'sign-up',
    'verify-email',
    'request-password',
    'resend-verification-email',
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

        if (this.accountRoutersLinks.indexOf(currentUrl) !== -1) {
          this.accountRouters = false
        } else {
          this.accountRouters = true
        }
      }
    })

    this.alertsMessagesService.alerts$.subscribe(alerts => {
      this.alerts = alerts
    })
  }

  ngOnInit() {}

}
