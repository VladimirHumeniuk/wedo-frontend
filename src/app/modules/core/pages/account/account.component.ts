import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { AuthService } from 'src/app/shared/services';
@Component({
  selector: 'wd-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  private queryParams: Params

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParams = params
    })
  }

  private resolveMode(mode: string): void {
    switch (mode) {
      case 'resetPassword':
        this.ngZone.run(() => {
          this.router.navigate(['/account/reset-password'], {
            queryParams: {...this.queryParams}
          })
        })
        break

      case 'verifyEmail':
        this.ngZone.run(() => {
          this.router.navigate(['/account/email-verified'], {
            queryParams: {...this.queryParams}
          })
        })
        break

      default:
        this.ngZone.run(() => {
          this.router.navigate(['/'])
        })
        break
    }
  }

  ngOnInit() {
    const hasParams = Object.keys(this.queryParams).length > 0

    if (this.router.url !== '/account/invalid-action-code') {
      if (hasParams) {
        const { mode, oobCode } = this.queryParams

        this.authService.checkActionCode(oobCode)
          .then(() => {
            this.resolveMode(this.queryParams.mode)
          })
          .catch(error => {
            this.ngZone.run(() => {
              this.router.navigate(['/account/invalid-action-code'], {
                queryParams: {
                  mode: mode,
                  oobCode: oobCode
                }
              })
            })
          })
      } else {
        this.router.navigate(['/'])
      }
    }
  }

}
