import { Component, Input } from '@angular/core';

@Component({
  selector: 'wd-form-explain',
  templateUrl: './form-explain.component.html',
  styleUrls: ['./form-explain.component.scss']
})
export class FormExplainComponent {

  @Input() errorsCodes: Array<any>
  @Input() errorsText: Array<any>
  @Input() controlName: string

  constructor() { }

}
