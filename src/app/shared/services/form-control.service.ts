import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  public getControlStatus(control: string, form: FormGroup): string {
    const validated = form.controls[control].dirty && form.controls[control].touched

    if (validated) {
      if (form.controls[control].errors) {
        return 'danger'
      }

      if (form.controls[control].valid) {
        return 'success'
      }
    }
  }

  constructor() { }
}
