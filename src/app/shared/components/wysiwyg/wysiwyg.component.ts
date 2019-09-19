import { Component, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FORMS_MESSAGES } from './../../constants/forms-messages';
import { functions } from 'firebase';

@Component({
  selector: 'wd-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss']
})
export class WysiwygComponent implements OnInit {

  @Input() parentForm: FormGroup
  @Input() label: string
  @Input() name: string
  @Input() maxLength: number

  public dirty: boolean
  public redo: number = 0
  public length: number = 0

  constructor(
    private elementRef: ElementRef
  ) { }

  public formatText(style: string): void {
    document.execCommand(style)

    if (style === 'undo'){
      if (this.parentForm.get(this.name).value.length === 0) {
        this.dirty = false
      }
      this.redo++
    }

    if (style === 'redo') {
      this.redo--
    }
  }

  ngOnInit() {
    const htmlRegexp = /<[^>]*>|&nbsp;/g
    const formControl = this.parentForm.get(this.name)

    formControl.valueChanges.subscribe((value: string) => {
      this.length = value.replace(htmlRegexp, '').length

      if (formControl.dirty) {
        this.dirty = true
      }

      if (this.length > this.maxLength) {
        formControl.setErrors({
          'length': {
            message: `Maximum character exceeded: ${this.maxLength}`
          }
        })
      }
    })
  }

  ngAfterViewInit() {
    const content: HTMLElement = this.elementRef.nativeElement.querySelector('.wysiwyg__content')

    content.addEventListener('paste', (event: ClipboardEvent) => {
      event.preventDefault()
      const text = event.clipboardData.getData('text/plain')

      document.execCommand('insertHTML', false, text);
    })
  }

}
