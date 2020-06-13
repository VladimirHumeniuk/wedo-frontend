import { Component, OnInit } from '@angular/core';
import { EMAIL_REGEXP, FORMS_MESSAGES } from 'src/app/shared/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'wd-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss']
})
export class UpdateEmailComponent implements OnInit {

  public updateEmailForm: FormGroup;
  public loading: boolean;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) { }

  private formInit(): void {
    this.updateEmailForm = this.formBuilder.group({
      confirmPasswordForEmailChange: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(EMAIL_REGEXP)
      ]]
    })
  }

  public changeEmail(): void {
    if (this.updateEmailForm.valid) {
      this.loading = true
      const { confirmPasswordForEmailChange, email } = this.updateEmailForm.value

      this.authService.updateEmail(confirmPasswordForEmailChange, email).then(() => {
        this.updateEmailForm.reset()
        this.updateEmailForm.markAsPristine()
      }).catch(error => {
        if (error.code === 'auth/wrong-password') {
          const control = this.updateEmailForm.get('confirmPasswordForEmailChange')
          control.setErrors({
          'wrongPassword': {
            message: FORMS_MESSAGES.password.wrongPasswordCurrent
          }})
        }

        if (error.code === 'auth/email-already-in-use') {
          const control = this.updateEmailForm.get('email')
          control.setErrors({
          'inUse': {
            message: FORMS_MESSAGES.email.inUse
          }})
        }
      }).finally(() => this.loading = false)
    }
  }

  ngOnInit(): void {
    this.formInit()
  }

}
