import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertsMessagesService, UserService } from '../../../shared/services';
import { Alert } from '../../../shared/models';
import { AppState } from '../../../app.state';
import { GetUser } from '../../../store/actions/user.action';
import { tap, takeUntil } from 'rxjs/operators';
import { SafeComponent } from '../../../shared/helpers';

@Component({
  selector: 'wd-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends SafeComponent implements OnInit {
  public accountRouters: boolean;
  private accountRoutersLinks: Array<string> = [
    'sign-in',
    'sign-up',
    'verify-email',
    'prompt-password',
    'request-password',
    'resend-verification-email',
    'account/email-verified',
    'account/reset-password',
    'account/invalid-action-code'
  ];

  public alerts: Alert[];
  public loading: boolean;

  constructor(
    private readonly router: Router,
    private readonly alertsMessagesService: AlertsMessagesService,
    private readonly store: Store<AppState>,
    private readonly userService: UserService
  ) {
    super();

    this.userService.user$
      .pipe(
        takeUntil(this.unsubscriber),
        tap((x: any) => (this.loading = x.loading === true))
      )
      .subscribe();

    this.router.events
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          let currentUrl = event.url.substr(1);

          if (currentUrl.indexOf('?') > -1) {
            currentUrl = currentUrl.substr(0, event.url.indexOf('?') - 1);
          }

          if (this.accountRoutersLinks.indexOf(currentUrl) !== -1) {
            this.accountRouters = false;
          } else {
            this.accountRouters = true;
          }
        }
      });

    this.alertsMessagesService.alerts$
      .pipe(
        takeUntil(this.unsubscriber),
        tap(alerts => (this.alerts = alerts))
      )
      .subscribe();
  }

  ngOnInit() {
    this.store.dispatch(new GetUser());
  }
}
