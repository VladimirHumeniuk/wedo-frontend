import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../app.state';
import { AuthService } from 'src/app/shared/services';
import { CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'wd-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  public holdTimer: boolean = true
  public loader: boolean = false
  public user$ = this.store.select('user')
  public resended: boolean

  constructor(
    private readonly store: Store<AppState>,
    private readonly authService: AuthService
  ) { }

  public handleTimerEvent(event: CountdownEvent): void {
    if (event.action === 'done') this.holdTimer = false
  }

  public resendEmail(): void {
    this.loader = true
    this.authService.sendEmailVerification()
      .then(() => {
        this.holdTimer = true
        this.loader = false
        this.resended = true
      }).catch(error => {
        this.loader = false
        throw new Error(error)
      })
  }

  ngOnInit() {
  }

}
