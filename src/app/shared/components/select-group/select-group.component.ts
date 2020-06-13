import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlService } from '../../services';

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

  public status: string

  public getStatus(): void {
    this.status = this.formControlService.getControlStatus(this.name, this.parentForm)
  }

  public resetStatus(): void {
    this.status = null
  }

  constructor(
    public readonly formControlService: FormControlService
  ) { }

}
