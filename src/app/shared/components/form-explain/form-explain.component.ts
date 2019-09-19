import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FORMS_MESSAGES } from 'src/app/shared/constants';

@Component({
  selector: 'wd-form-explain',
  templateUrl: './form-explain.component.html',
  styleUrls: ['./form-explain.component.scss']
})
export class FormExplainComponent {

  @Input() formName: FormGroup
  @Input() controlName: string
  @Input() isRelative: boolean

  public errors: Array<any> = []

  constructor() { }

  ngOnInit() {
    const control = this.formName.get(this.controlName)
    const errors = control.errors

     Object.keys(errors).forEach((el: any) => {
      const name: string = this.controlName[0].toUpperCase() + this.controlName.substr(1)
      let error = errors[el]

      switch (el) {
        case 'minlength':
          this.errors.push({message: `${name} min length: ${errors[el]['requiredLength']}`})
          break

        case 'maxlength':
          this.errors.push({message: `${name} max length: ${errors[el]['requiredLength']}`})
          break

        case 'pattern':
          this.errors.push({message: `${name} is not valid`})
          break

        default:
          if (error.message) {
            this.errors.push(error)
          } else {
            if (el === 'required' && !FORMS_MESSAGES[this.controlName]) {
              this.errors.push({message: `${name} is required`})
            } else {
              this.errors.push({message: FORMS_MESSAGES[this.controlName][el]})
            }
          }
      }
    })
  }

}
