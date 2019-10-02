import { Alert } from './../shared/models/alert.model';
import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { AlertsMessagesService, UserService } from './../shared/services';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { GetUser } from '../store/actions/user.action';
import { tap, takeUntil } from 'rxjs/operators';
import { SafeComponent } from '../modules/core/helpers/safe-component.abstract';

@Component({
  selector: 'wd-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends SafeComponent implements OnInit {

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
  public loading: boolean;

  constructor(
    private router: Router,
    private alertsMessagesService: AlertsMessagesService,
    private readonly store: Store<AppState>,
    private readonly userService: UserService
  ) {
    super();

    this.userService.user$.pipe(
        takeUntil(this.unsubscriber),
        tap((x: any) => this.loading = x.loading === true)
    ).subscribe();

    this.router.events
        .pipe(
          takeUntil(this.unsubscriber)
        )
        .subscribe((event: Event) => {
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

    this.alertsMessagesService.alerts$.
        pipe(
          takeUntil(this.unsubscriber)
        ).subscribe(alerts => {
      this.alerts = alerts
    })
  }

  ngOnInit() {
    this.store.dispatch(new GetUser());
  }

}
