import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'wd-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public signInForm: FormGroup
  public loading: boolean = false

  public explainMessages = {
    email: {
      required: "Email is required",
      pattern: "Email address is not valid"
    },
    password: {
      required: "Password is required"
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
      rememberUser: ['', [
        Validators.required
      ]]
    })
  }

  ngOnInit() {
    this.formInit()
  }

}
