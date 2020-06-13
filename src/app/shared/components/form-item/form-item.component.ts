import { Component, Input } from '@angular/core';

@Component({
  selector: 'wd-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent {

  @Input() isDouble: boolean

  constructor() { }

}
