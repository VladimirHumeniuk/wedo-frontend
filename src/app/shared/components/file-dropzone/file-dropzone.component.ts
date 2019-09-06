import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { Upload } from '../../models/upload';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FORMS_MESSAGES } from 'src/app/shared/constants';

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
  public validationErrors: Array<ValidationErrors> = []
  public icon: string = 'image-outline'

  private fileReader: FileReader = new FileReader()
  private imageRegexp: RegExp = new RegExp('(.*?)\.(jpg|png|jpeg)$')

  constructor() { }

  public detectFiles(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      const { name, size, type } = file
      const isImage = this.imageRegexp.test(type.toLowerCase())
      const isValidSize = size <= (this.maxSize * 1000)

      if (isValidSize && isImage) {
        this.selectedFile = file
        this.icon = 'trash-2-outline'

        this.fileReader.readAsDataURL(file);

        this.fileReader.onload = () => {
          this.fileUrl = this.fileReader.result
        }
      } else {
        const control = this.parentForm.get(this.name)

          if (!isImage) {
            control.setErrors({
              'type': {
                message: FORMS_MESSAGES.imageUpload.type
              }
            })
          }

          if (!isValidSize) {
            control.setErrors({
              'size': {
                message: `${FORMS_MESSAGES.imageUpload.size} ${this.maxSize}kb`
              }
            })
        }
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
    const formControl = this.parentForm.get(this.name)

    formControl.statusChanges.subscribe((status: string) => {
      if (status === 'VALID') this.validationErrors = []
      if (status === 'INVALID') {
        this.icon = 'refresh-outline'
        Object.values(formControl.errors).forEach((error: ValidationErrors) => {
          this.validationErrors.push(error)
        })
      }
    })
  }

}
