import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EMAIL_REGEXP, URL_REGEXP, FORMS_MESSAGES } from 'src/app/shared/constants';
import { CompanyCard } from './../../../../shared/models';

@Component({
  selector: 'wd-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.scss']
})
export class MyCardComponent implements OnInit {

  public myCardForm: FormGroup
  public loading: boolean

  private emailRegexp: RegExp = EMAIL_REGEXP
  private urlRegexp: RegExp = URL_REGEXP

  public categories = ['Finance', 'Cars']

  constructor(
    private fireStore: AngularFirestore,
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
      email: ['', [
        Validators.pattern(this.emailRegexp),
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      url: ['', [
        Validators.pattern(this.urlRegexp)
      ]],
      address: ['', [
        Validators.minLength(3),
        Validators.maxLength(290)
      ]],
      category: [null, [
        Validators.required
      ]],
      wysiwyg: [''],
      isShown: [false]
    })
  }

  public publishCard(data: CompanyCard): void {
    this.loading = true

    if (this.myCardForm.invalid) {
      this.loading = false
    }

    if (this.myCardForm.valid) {
      const formData: CompanyCard = this.myCardForm.value
      console.log('formData', formData)
    }
  }

  ngOnInit() {
    this.formInit()
  }

}
