import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PartialObserver } from 'rxjs';

@Component({
  selector: 'wd-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  private queryParams: Params

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((map: Params) => map)
    this.queryParams = this.activatedRoute.snapshot.queryParams
  }

  private resolveMode(mode: string): void {
    console.log('mode', mode)

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
    if (this.queryParams) {
      this.resolveMode(this.queryParams.mode)
    }
  }

}
