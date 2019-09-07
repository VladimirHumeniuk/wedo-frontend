import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { parsePhoneNumberFromString, isValidNumber, PhoneNumber } from 'libphonenumber-js';
import { FORMS_MESSAGES } from './../../constants/forms-messages';
import { FormControlService } from '../../services';

@Component({
  selector: 'wd-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss']
})
export class InputGroupComponent implements OnInit {

  @Input() name: string
  @Input() label: string
  @Input() type: string
  @Input() placeholder: string
  @Input() parentForm: FormGroup
  @Input() helperLink: string
  @Input() helperTitle: string
  @Input() isPrivate: boolean

  public status: string
  public passVisible: boolean = false
  private phoneNumber: PhoneNumber

  public getStatus() {
    this.status = this.formControlService.getControlStatus(this.name, this.parentForm)
  }

  public resetStatus(): void {
    this.status = null
  }

  public showPassword(): void {
    this.passVisible = !this.passVisible

    if (this.passVisible) {
      this.type = 'text'
    } else {
      this.type = 'password'
    }
  }

  constructor(
    private formControlService: FormControlService,
  ) {}

  ngOnInit() {
    const formControl = this.parentForm.get(this.name)

    formControl.statusChanges.subscribe((status: string) => {
      this.status = this.formControlService.getControlStatus(this.name, this.parentForm)
    })

    if (this.type === 'tel') {
      formControl.valueChanges.subscribe((value: string) => {
        this.phoneNumber = parsePhoneNumberFromString(value)

        if (value) {
          const isPossible = this.phoneNumber && this.phoneNumber.isPossible()
          const isValid = this.phoneNumber && this.phoneNumber.isValid()

          if (!isPossible || !isValid) {
            formControl.setErrors({
              'invalid': {
                message: FORMS_MESSAGES.phone.invalid
              }
            })
          }
        }

        console.log('formControl.errors', formControl.errors);
      })
    }
  }

}
