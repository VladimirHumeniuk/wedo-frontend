import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'wd-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  public holdTimer: boolean = true
  public loader: boolean = false

  constructor(
    private authService: AuthService
  ) { }

  public resendEmail(): void {
    this.loader = true

    this.authService.sendEmailVerification()
      .then(() => {
        this.holdTimer = true
        this.loader = false
      }).catch(error => {
        throw new Error(error)
        console.error(error)
      })
  }

  ngOnInit() {
  }

}
