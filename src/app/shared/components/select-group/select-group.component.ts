import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

class SelectOption {
  value: string;
  title: string;
}

@Component({
  selector: 'wd-select-group',
  templateUrl: './select-group.component.html',
  styleUrls: ['./select-group.component.scss']
})
export class SelectGroupComponent {

  @Input() name: string
  @Input() label: string
  @Input() placeholder: string
  @Input() parentForm: FormGroup
  @Input() options: SelectOption

  constructor() { }

}
