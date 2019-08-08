import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services';
import { EMAIL_REGEXP, FORMS_MESSAGES } from 'src/app/shared/constants';

@Component({
  selector: 'wd-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent implements OnInit {

  public requestPasswordForm: FormGroup
  public loading: boolean
  public holdTimer: boolean
  public emailSent: boolean
  public email: string

  private emailRegex: RegExp = EMAIL_REGEXP

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  private formInit(): void {
    this.requestPasswordForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailRegex)
      ]],
    })
  }

  public requestPassword(): boolean {
    this.loading = true

    if (this.requestPasswordForm.invalid) {
      this.loading = false
    }

    if (this.requestPasswordForm.valid) {
      const formData = this.requestPasswordForm.value

      this.authService.sendPasswordResetEmail(formData.email)
        .then(() => {
          this.loading = false
          this.requestPasswordForm.reset()
          this.emailSent = true
          this.email = formData.email
          this.holdTimer = true
        })
        .catch(error => {
          this.loading = false
          const control = this.requestPasswordForm.get('email')

          switch (error.code) {
            case 'auth/user-not-found':
              control.setErrors({
                'userNotFound': {
                  message: FORMS_MESSAGES.email.userNotFound
                }
              })
              break

            case 'auth/too-many-requests':
              control.setErrors({
                'toManyRequests': {
                  message: FORMS_MESSAGES.email.toManyRequests
                }
              })
              break

            default:
              control.setErrors({
                'generic': {
                  message: FORMS_MESSAGES.email.generic
                }
              })
              break
          }

          throw Error(error)
        })
    }

    return
  }

  public resendEmail(): void {
    this.emailSent = false
  }

  ngOnInit() {
    this.formInit()
  }

}
