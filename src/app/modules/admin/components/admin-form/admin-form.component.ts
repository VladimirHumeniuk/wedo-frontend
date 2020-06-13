import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'wd-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() loading: boolean;

  constructor(
    private readonly location: Location
  ) { }

  public goBack($event: Event): void {
    $event.preventDefault()
    this.location.back();
  }

  ngOnInit(): void {
  }

}
