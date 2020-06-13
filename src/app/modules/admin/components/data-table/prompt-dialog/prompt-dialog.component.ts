import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'wd-prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.scss']
})
export class PromptDialogComponent {

  @Input() name: string
  @Input() id: string

  constructor(
    protected dialogRef: NbDialogRef<PromptDialogComponent>
  ) { }

  public dismiss() {
    this.dialogRef.close()
  }

  public proceed() {
    this.dialogRef.close(true)
  }
}
