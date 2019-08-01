import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services';
import { emailRegexp } from 'src/app/shared/constants';

@Component({
  selector: 'wd-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent implements OnInit {

  public requestPasswordForm: FormGroup
  private emailRegex: RegExp = emailRegexp

  public loading: boolean = false
  public holdTimer: boolean = false
  public emailSent: boolean = false

  public explainMessages = {
    email: {
      generic: "We have unforeseen problems with this email address. Check the address or try again later",
      required: "Email is required",
      userNotFound: "We have no user record corresponding to this email address",
      toManyRequests: "We have blocked all requests from this device due to unusual activity. Try again later."
    }
  }

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
          this.holdTimer = true
        })
        .catch(error => {
          this.loading = false
          const control = this.requestPasswordForm.get('email')

          switch (error.code) {
            case 'auth/user-not-found':
              control.setErrors({
                'userNotFound': {
                  message: this.explainMessages.email.userNotFound
                }
              })
              break

            case 'auth/too-many-requests':
              control.setErrors({
                'toManyRequests': {
                  message: this.explainMessages.email.toManyRequests
                }
              })
              break

            default:
              control.setErrors({
                'generic': {
                  message: this.explainMessages.email.generic
                }
              })
              break
          }

          throw Error(error)
        })
    }

    return
  }

  ngOnInit() {
    this.formInit()
  }

}
