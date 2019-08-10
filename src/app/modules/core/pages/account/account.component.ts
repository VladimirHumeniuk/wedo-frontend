import { Component, OnInit } from '@angular/core';
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
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParams = params
    })
  }

  private resolveMode(mode: string): void {
    switch (mode) {
      case 'resetPassword':
        this.router.navigate(['/account/reset-password'], {
          queryParams: {...this.queryParams}
        })
        break

      case 'verifyEmail':
        this.router.navigate(['/account/email-verified'], {
          queryParams: {...this.queryParams}
        })
        break

      default:
        this.router.navigate(['/'])
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
            this.router.navigate(['/account/invalid-action-code'], {
              queryParams: {
                mode: mode,
                oobCode: oobCode
              }
            })
          })
      } else {
        this.router.navigate(['/'])
      }
    }
  }

}
