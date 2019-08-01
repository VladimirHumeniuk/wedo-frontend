import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

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
    'account/reset-password'
  ]

  constructor(
    protected router: Router
  ) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url.substr(1)

        if (this.noNavigationRoutes.indexOf(currentUrl) !== -1) {
          this.needNavigation = false
        } else {
          this.needNavigation = true
        }
      }
    })
  }

  ngOnInit() {}

}
