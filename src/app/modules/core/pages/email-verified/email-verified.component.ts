import { Component, OnInit } from '@angular/core';
import { AuthService, CloudApiService, AlertsMessagesService } from 'src/app/shared/services';
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
    private readonly authService: AuthService,
    private readonly alertsService: AlertsMessagesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly cloudApi: CloudApiService
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
          .then((data: firebase.User) => {
            const { uid } = data

            this.authService.verifyEmail(this.oobCode, uid)
              .then(() => {
                this.emailVerified = true
                this.alertsService.removeAlert('email-not-verified', uid)
              })
              .catch(error => {
                this.tokenExpired = true
                throw new Error(error)
              })
          })
      })
  }

}
