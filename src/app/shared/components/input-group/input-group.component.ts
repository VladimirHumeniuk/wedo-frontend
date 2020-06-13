import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { parsePhoneNumberFromString, isValidNumber, PhoneNumber } from 'libphonenumber-js';
import { FORMS_MESSAGES } from './../../constants';
import { FormControlService } from '../../services';

@Component({
  selector: 'wd-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss']
})
export class InputGroupComponent implements OnInit, OnChanges {

  @Input() name: string
  @Input() label: string
  @Input() type: string
  @Input() placeholder: string
  @Input() parentForm: FormGroup
  @Input() helperLink: string
  @Input() helperTitle: string
  @Input() isPrivate: boolean
  @Input() rows: number
  @Input() disabled: boolean
  @Input() autocomplete: string

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();

  public isDisabled: boolean

  public status: string
  public passVisible: boolean = false
  public phoneNumber: PhoneNumber

  private emitAction(action: string): void {
    const actions: { [key: string]: EventEmitter<any> } = {
      'blur': this.blur,
      'focus': this.focus
    }

    actions[action].emit()
  }

  public onFocus() {
    this.emitAction('focus')
    this.resetStatus()
  }

  public onBlur() {
    this.emitAction('blur')
    this.getStatus()
  }

  public getStatus() {
    this.status = this.formControlService.getControlStatus(this.name, this.parentForm)
  }

  public resetStatus(): void {
    this.status = null
  }

  public showPassword(event: Event): void {
    event.preventDefault()
    this.passVisible = !this.passVisible

    if (this.passVisible) {
      this.type = 'text'
    } else {
      this.type = 'password'
    }
  }

  constructor(
    private readonly formControlService: FormControlService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.disabled) {
      this.isDisabled = changes.disabled.currentValue
    }
  }

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
      })
    }
  }

}
