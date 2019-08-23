import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Upload } from '../../models/upload';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'wd-file-dropzone',
  templateUrl: './file-dropzone.component.html',
  styleUrls: ['./file-dropzone.component.scss'],
  animations: [
    trigger('hideInfo', [
      state('initial', style({
        opacity: 1,
        maxHeight: '100%'
      })),
      state('final', style({
        opacity: 0,
        maxHeight: '0'
      })),
      transition('initial => final', [
        animate('0.5s')
      ])
    ])
  ]
})
export class FileDropzoneComponent implements OnInit {

  @Input() name: string
  @Input() maxSize: number
  @Input() parentForm: FormGroup

  public selectedFiles: FileList
  public uploadData: Upload

  constructor() { }

  public detectFiles(event): void {
    if (event.target.files.length > 0) {
      this.selectedFiles = event.target.files[0];
    }
  }

  ngOnInit() {
  }

}
