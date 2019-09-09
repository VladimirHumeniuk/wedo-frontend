import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'wd-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss']
})
export class WysiwygComponent implements OnInit {

  @Input() parentForm: FormGroup
  @Input() label: string
  @Input() name: string

  public dirty: boolean
  public redo: number = 0

  constructor() { }

  public formatText(style: string): void {
    document.execCommand(style)

    if (style === 'undo'){
      if (this.parentForm.get(this.name).value.length === 0) {
        this.dirty = false
      }
      this.redo++
    }

    if (style === 'redo') {
      console.log('this.redo', this.redo);
      this.redo--
    }
  }

  ngOnInit() {
    const formControl = this.parentForm.get(this.name)

    formControl.valueChanges.subscribe((value: string) => {
      if (formControl.dirty) {
        this.dirty = true
      }
    })
  }

}
