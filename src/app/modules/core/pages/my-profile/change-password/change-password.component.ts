import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/helpers';
import { AuthService } from 'src/app/shared/services';
import { NbToastrService } from '@nebular/theme';
import { FORMS_MESSAGES } from 'src/app/shared/constants';

@Component({
  selector: 'wd-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public changePasswordForm: FormGroup;
  public loading: boolean;

  private passwordLength = { min: 6, max: 32 };

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastrService: NbToastrService
  ) { }

  private formInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [
        Validators.required
      ]],
      newPassword: ['', [
        Validators.minLength(this.passwordLength.min),
        Validators.maxLength(this.passwordLength.max)
      ]],
      confirmNewPassword: ['', [
        Validators.required,
      ]],
    }, {
      validators: MustMatch('newPassword', 'confirmNewPassword')
    })
  }

  public changePassword(): void {
    this.loading = false

    if (this.changePasswordForm.valid) {
      const { currentPassword, newPassword } = this.changePasswordForm.value

      this.authService.updatePassword(currentPassword, newPassword).then(() => {
        this.toastrService.success('Password successfully changed', 'Success')
        this.changePasswordForm.reset()
        this.changePasswordForm.markAsPristine()
      }).catch(() => {
        const control = this.changePasswordForm.get('currentPassword')
        control.setErrors({
        'wrongPassword': {
          message: FORMS_MESSAGES.password.wrongPasswordCurrent
        }})
      }).finally(() => this.loading = false)
    }
  }

  ngOnInit(): void {
    this.formInit()
  }

}
