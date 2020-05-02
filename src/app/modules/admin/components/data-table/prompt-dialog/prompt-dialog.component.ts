import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'wd-prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.scss']
})
export class PromptDialogComponent {

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
