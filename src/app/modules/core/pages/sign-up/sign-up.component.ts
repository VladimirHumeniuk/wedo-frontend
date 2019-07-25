import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'wd-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup
  private emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  public options = [
    {
      value: "company",
      title: "We are Company"
    },
    {
      value: "freelancer",
      title: "I'm a Freelancer"
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
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
        Validators.minLength(6),
        Validators.maxLength(24)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24)
      ]],
      accountType: ['', [
        Validators.required
      ]],
      termsAndConditions: ['', [
        Validators.required
      ]]
    })
  }

  onChange() {
    this.signUpForm.valueChanges.subscribe(val => console.log(val))
  }

  ngOnInit() {
    this.formInit()
    this.onChange()
  }

}
