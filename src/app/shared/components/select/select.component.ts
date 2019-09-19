import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'wd-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @Input() items: Array<any>
  @Input() parentForm: FormGroup
  @Input() placeholder: string
  @Input() name: string
  @Input() label: string
  @Input() appendTo: string
  @Input() clearable: boolean
  @Input() searchable: boolean

  constructor() { }

}
