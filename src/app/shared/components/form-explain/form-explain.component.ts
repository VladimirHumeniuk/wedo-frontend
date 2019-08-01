import { Component, Input } from '@angular/core';
import { FORMS_MESSAGES } from 'src/app/shared/constants';

@Component({
  selector: 'wd-form-explain',
  templateUrl: './form-explain.component.html',
  styleUrls: ['./form-explain.component.scss']
})
export class FormExplainComponent {

  @Input() errorsCodes: Array<any>
  @Input() controlName: string

  public errorsText = FORMS_MESSAGES

  constructor() { }

}
