import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlService } from '../../services';

@Component({
  selector: 'wd-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss']
})
export class InputGroupComponent implements OnInit {

  @Input() name: string
  @Input() label: string
  @Input() type: string
  @Input() placeholder: string
  @Input() parentForm: FormGroup

  public status: string

  public getStatus() {
    this.status = this.formControlService.getControlStatus(this.name, this.parentForm)
  }

  public resetStatus(): void {
    this.status = null
  }

  constructor(
    public formControlService: FormControlService
  ) {}

  ngOnInit() {
    const formControl = this.parentForm.get(this.name)

    formControl.statusChanges.subscribe((status: string) => {
      this.status = this.formControlService.getControlStatus(this.name, this.parentForm)
    })
  }

}
