import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'wd-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() items: Array<any>
  @Input() parentForm: FormGroup
  @Input() placeholder: string
  @Input() name: string
  @Input() label: string

  constructor() { }

  ngOnInit() {
  }

}
