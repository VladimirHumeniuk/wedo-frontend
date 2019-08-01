import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'wd-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {

  @Input() heading: string

  constructor(
    private location: Location
  ) { }

  protected goBack(): void {
    this.location.back()
  }
}
