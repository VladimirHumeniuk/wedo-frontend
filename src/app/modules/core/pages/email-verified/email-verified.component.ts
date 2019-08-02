import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wd-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrls: ['./email-verified.component.scss']
})
export class EmailVerifiedComponent implements OnInit {

  public user: any

  private oobCode: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.oobCode = params.oobCode
    })
  }

  ngOnInit() {
    this.authService.userSource.subscribe(data => {
      this.user = data
    })

    this.authService.handleVerifyEmail(this.oobCode)
  }

}
