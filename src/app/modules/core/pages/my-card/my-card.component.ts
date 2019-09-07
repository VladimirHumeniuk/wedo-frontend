import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EMAIL_REGEXP, FORMS_MESSAGES } from 'src/app/shared/constants';

@Component({
  selector: 'wd-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.scss']
})
export class MyCardComponent implements OnInit {

  public myCardForm: FormGroup
  public loading: boolean

  private emailRegex: RegExp = EMAIL_REGEXP

  constructor(
    private formBuilder: FormBuilder
  ) { }

  private formInit(): void {
    this.myCardForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(34)
      ]],
      image: [null],
      phone: [''],
      address: ['', [
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      email: ['', [
        Validators.pattern(this.emailRegex),
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      body: ['', [
        Validators.minLength(0),
        Validators.maxLength(20)
      ]]
    })
  }

  ngOnInit() {
    this.formInit()
  }

}
