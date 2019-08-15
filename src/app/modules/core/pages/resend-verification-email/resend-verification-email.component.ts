import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../app.state';
import { User } from './../../../../shared/models';
import { UserService, AuthService } from './../../../../shared/services';

@Component({
  selector: 'wd-resend-verification-email',
  templateUrl: './resend-verification-email.component.html',
  styleUrls: ['./resend-verification-email.component.scss']
})
export class ResendVerificationEmailComponent implements OnInit {

  public loading: boolean
  public resended: boolean
  public user$ = this.store.select('user')

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  public resendEmail(): void {
    this.loading = true
    this.authService.sendEmailVerification()
      .then(() => {
        this.resended = true
        this.loading = false
      })
  }

  ngOnInit() {
  }

}
