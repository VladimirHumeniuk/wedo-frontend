import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services';
import { MustMatch } from 'src/app/shared/helpers';
import { FORMS_MESSAGES } from 'src/app/shared/constants';

@Component({
  selector: 'wd-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public changePasswordForm: FormGroup
  public loading: boolean
  public passwordUpdated: boolean
  public tokenExpired: boolean

  private oobCode: string
  private passwordLength = { min: 6, max: 32 }

  constructor(
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.oobCode = params.oobCode
    })
  }

  private formInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.minLength(this.passwordLength.min),
        Validators.maxLength(this.passwordLength.max)
      ]],
      confirmPassword: ['', [
        Validators.required,
      ]],
    }, {
      validators: MustMatch('password', 'confirmPassword')
    })
  }

  private passwordOnChange(): void {
    const confirmPassword = this.changePasswordForm.get('confirmPassword')
    this.changePasswordForm.get('password').valueChanges.subscribe((value: string) => {

      if (value) {
        if (value.length >= 6) {
          confirmPassword.enable()
        } else if (value.length === 0) {
          confirmPassword.reset({value: '', disabled: true})
        } else {
          confirmPassword.disable()
        }
      }
    })
  }

  public resetPassword(): void {
    this.loading = true

    if (this.changePasswordForm.invalid) {
      this.loading = false
    }

    if (this.changePasswordForm.valid) {
      const { password } = this.changePasswordForm.value

      this.authService.resetPassword(this.oobCode, password)
        .then(() => {
          this.passwordUpdated = true
          this.changePasswordForm.reset()
        })
        .catch(error => {
          if (error.code === 'auth/expired-action-code') {
            this.tokenExpired = true
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }

  ngOnInit() {
    this.formInit()
    this.changePasswordForm.get('confirmPassword').disable()
    this.passwordOnChange()
  }

}
