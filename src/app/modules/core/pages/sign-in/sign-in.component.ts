import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services';
import { emailRegexp } from 'src/app/shared/constants';

@Component({
  selector: 'wd-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public signInForm: FormGroup
  private emailRegex: RegExp = emailRegexp

  public loading: boolean = false

  public explainMessages = {
    email: {
      required: "Email is required",
      pattern: "Email address is not valid"
    },
    password: {
      required: "Password is required",
      wrongPassword: "The password is invalid or the user with this email does not exist"
    },
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
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
        .then(() => this.loading = false)
        .catch(error => {
          this.loading = false

          if (error.code === 'auth/wrong-password') {
            const control = this.signInForm.get('password')

            control.setErrors({
              'wrongPassword': {
                message: this.explainMessages.password.wrongPassword
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
