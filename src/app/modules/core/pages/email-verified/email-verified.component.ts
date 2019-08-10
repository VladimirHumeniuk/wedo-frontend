import { Component, OnInit } from '@angular/core';
import { AuthService, CloudApiService } from 'src/app/shared/services';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'wd-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrls: ['./email-verified.component.scss']
})
export class EmailVerifiedComponent implements OnInit {

  public emailVerified: boolean
  public tokenExpired: boolean
  public email: string

  private oobCode: string

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private cloudApi: CloudApiService
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.oobCode = params.oobCode
    })
  }

  ngOnInit() {
    this.authService.checkActionCode(this.oobCode)
      .then((codeInfo: firebase.auth.ActionCodeInfo) => {
        const { email } = codeInfo.data

        this.email = email

        this.cloudApi.getUserByEmail(email)
          .then((data: firebase.auth.UserCredential) => {
            const { uid } = data.user

            this.authService.verifyEmail(this.oobCode, uid)
              .then(() => {
                this.emailVerified = true
              })
              .catch(error => {
                this.tokenExpired = true
                throw new Error(error)
              })
          })
      })
  }

}
