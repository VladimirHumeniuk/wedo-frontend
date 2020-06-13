import { AppState } from 'src/app/app.state';
import { Component, OnInit } from '@angular/core';
import { AuthService, CloudApiService, AlertsMessagesService } from 'src/app/shared/services';
import { ActivatedRoute, Params } from '@angular/router';
import {Store} from '@ngrx/store';
import {RemoveAlert} from 'src/app/store/actions/alert.action';

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
    private readonly cloudApi: CloudApiService,
    private readonly store: Store<AppState>
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.oobCode = params.oobCode
    })
  }

  ngOnInit() {
    this.authService.checkActionCode(this.oobCode)
      .then((codeInfo: firebase.auth.ActionCodeInfo) => {
        const { email } = codeInfo.data

        this.email = email;
        let uid = null;
        this.cloudApi.getUserByEmail(email)
          .then((data: firebase.User) => {
            uid = data.uid;

            return this.authService.verifyEmail(this.oobCode, uid);
          })
          .then(() => {
            this.emailVerified = true;
            this.store.dispatch(new RemoveAlert({uid, code: 'email-not-verified'}));
          })
          .catch(error => {
            this.tokenExpired = true;
            throw new Error(error);
          });
      });
  }

}
