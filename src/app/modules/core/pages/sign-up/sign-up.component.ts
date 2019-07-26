import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services';
import { MustMatch } from 'src/app/shared/helpers';

@Component({
  selector: 'wd-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup
  private emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

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

  public getInputStatus(control: string): string {
    const validated = this.signUpForm.controls[control].dirty && this.signUpForm.controls[control].touched

    if (validated) {
      if (this.signUpForm.controls[control].errors) {
        return 'danger'
      }

      if (this.signUpForm.controls[control].valid) {
        return 'success'
      }
    }
  }

  public signUp(): boolean {
    this.loading = true

    if (this.signUpForm.invalid) {
      this.loading = false
    }

    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value

      this.authService.createUserWithEmailAndPassword(formData)
        .then(() => this.loading = false)
        .catch(error => {
          this.loading = false
          console.log(error)
        })
    }

    return
  }

  ngOnInit() {
    this.formInit()
  }

}
