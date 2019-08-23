import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Upload } from '../../models/upload';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'wd-file-dropzone',
  templateUrl: './file-dropzone.component.html',
  styleUrls: ['./file-dropzone.component.scss'],
  animations: [
    trigger('hide', [
      state('initial', style({
        opacity: 1,
      })),
      state('final', style({
        opacity: 0,
      })),
      transition('initial => final', [
        animate('0.25s cubic-bezier(0.4, 0.0, 1, 1)')
      ])
    ]),
    trigger('slideDown', [
      state('initial', style({
        transform: 'translateY(0)',
      })),
      state('final', style({
        transform: 'translateY(50%)',
      })),
      transition('initial => final', [
        animate('0.35s cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ]),
    trigger('blurImage', [
      state('initial', style({
        opacity: 0,
        filter: 'blur(20px)'
      })),
      state('final', style({
        opacity: 1,
        filter: 'blur(0px)'
      })),
      transition('initial => final', [
        animate('0.5s cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ])
  ]
})
export class FileDropzoneComponent implements OnInit {

  @Input() name: string
  @Input() maxSize: number
  @Input() parentForm: FormGroup

  public selectedFile: FileList
  public uploadData: Upload
  public fileUrl: string | ArrayBuffer

  private fileReader: FileReader = new FileReader()

  constructor() { }

  public detectFiles(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.selectedFile = file

      this.fileReader.readAsDataURL(file);

      this.fileReader.onload = () => {
        this.fileUrl = this.fileReader.result
      }
    }
  }

  public clear(event): void {
    event.preventDefault()
    this.parentForm.get(this.name).reset()
    this.fileUrl = null
    this.selectedFile = null
  }

  ngOnInit() {
  }

}
