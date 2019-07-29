import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services';
import { MustMatch } from 'src/app/shared/helpers';
import { emailRegexp } from 'src/app/shared/constants';

@Component({
  selector: 'wd-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup
  private emailRegex: RegExp = emailRegexp

  public loading: boolean = false

  public accountTypes = [
    {
      value: "company",
      title: "We are Company"
    },
    {
      value: "freelancer",
      title: "I'm a Freelancer"
    }
  ]

  private passwordLength = { min: 6, max: 24 }

  public explainMessages = {
    email: {
      required: "Email is required",
      inUse: "The email address is already in use by another account",
      pattern: "Email address is not valid"
    },
    password: {
      minlength: `Password min length: ${this.passwordLength.min}`,
      maxlength: `Password max length: ${this.passwordLength.max}`,
      required: "Password is required"
    },
    confirmPassword: {
      required: "Please confirm password",
      mustMatch: "Passwords must match"
    },
    accountType: {
      required: "Choose account type"
    },
    acceptTermsAndConditions: {
      required: "Please indicate that you have read and agree to the Terms and Conditions"
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  private formInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailRegex)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(this.passwordLength.min),
        Validators.maxLength(this.passwordLength.max)
      ]],
      confirmPassword: ['', [
        Validators.required,
      ]],
      accountType: ['', [
        Validators.required
      ]],
      acceptTermsAndConditions: ['', [
        Validators.requiredTrue
      ]]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    })
  }

  public passwordOnChange() {
    const confirmPassword = this.signUpForm.get('confirmPassword')
    this.signUpForm.get('password').valueChanges.subscribe((value: string) => {
      if (value.length >= 6) {
        confirmPassword.enable()
      } else if (value.length === 0) {
        confirmPassword.reset({value: '', disabled: true})
      } else {
        confirmPassword.disable()
      }
    })
  }

  public signUp(): boolean {
    this.loading = true

    if (this.signUpForm.invalid) {
      this.loading = false
    }

    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value

      this.authService.createUserWithEmailAndPassword(formData)
        .then(() => {
          this.loading = false
          this.signUpForm.reset()
        })
        .catch(error => {
          this.loading = false

          if (error.code === 'auth/email-already-in-use') {
            const control = this.signUpForm.get('email')

            control.setErrors({
              'inUse': {
                message: this.explainMessages.email.inUse
              }})
          }

          throw Error(error)
        })
    }

    return
  }

  ngOnInit() {
    this.formInit()
    this.signUpForm.get('confirmPassword').disable()
    this.passwordOnChange()
  }

}
