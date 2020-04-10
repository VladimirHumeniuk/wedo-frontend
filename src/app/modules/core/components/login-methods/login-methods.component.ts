import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services';
import { Alert } from './../../../../shared/models';
import { AUTH_WITH_POPUP } from 'src/app/shared/constants';

@Component({
  selector: 'wd-login-methods',
  templateUrl: './login-methods.component.html',
  styleUrls: ['./login-methods.component.scss']
})
export class LoginMethodsComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
  ) { }

  public error: Alert;

  public signInWithPopup(provider: string): void {
    this.authService.signInWithProvider(provider)
      .catch(error => {
        const code = error.code

        this.error = {
          code: code,
          ...AUTH_WITH_POPUP[code]
        }
      })
  }

  ngOnInit() {
  }

}
