import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services';
import { EMAIL_REGEXP, FORMS_MESSAGES } from 'src/app/shared/constants';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { GetUser } from 'src/app/store/actions/user.action';

@Component({
  selector: 'wd-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public signInForm: FormGroup
  private emailRegex: RegExp = EMAIL_REGEXP

  public loading: boolean = false

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly store: Store<AppState>
  ) { }

  private formInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailRegex)
      ]],
      password: ['', [
        Validators.required,
      ]],
      rememberUser: ['']
    })
  }

  public signIn(): boolean {
    this.loading = true

    if (this.signInForm.invalid) {
      this.loading = false
    }

    if (this.signInForm.valid) {
      const formData = this.signInForm.value

      this.authService.signInWithEmailAndPassword(formData)
        .then(() => {
          this.loading = false
          this.signInForm.reset();
          this.store.dispatch(new GetUser());
        })
        .catch(error => {
          this.loading = false

          if (error.code === 'auth/wrong-password') {
            const control = this.signInForm.get('password')

            control.setErrors({
              'wrongPassword': {
                message: FORMS_MESSAGES.password.wrongPassword
              }})
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
