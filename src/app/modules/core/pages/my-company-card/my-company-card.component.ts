import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EMAIL_REGEXP, URL_REGEXP, FORMS_MESSAGES } from 'src/app/shared/constants';
import { CompanyCard, User, Upload } from '../../../../shared/models';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UploadService, UserService } from 'src/app/shared/services';
import { map, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'wd-my-company-card',
  templateUrl: './my-company-card.component.html',
  styleUrls: ['./my-company-card.component.scss']
})
export class MyCompanyCardComponent implements OnInit {

  public myCardForm: FormGroup
  public user$: Observable<User> = this.store.select('user')
  public user: User
  public loading: boolean
  public upload: Upload
  public companyCard: CompanyCard

  private removeImage: boolean
  private emailRegexp: RegExp = EMAIL_REGEXP
  private urlRegexp: RegExp = URL_REGEXP

  public categories = ['Cats', 'Dogs'] // todo

  constructor(
    private toastrService: NbToastrService,
    private fireStore: AngularFirestore,
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private store: Store<AppState>,
    private userService: UserService
  ) {
    this.user$.subscribe((user: User) => {
      this.user = user

      if (user) {
        this.userService.getUserCompany(user.company)
          .subscribe((companyCard: CompanyCard) => {
            if (companyCard) {
              this.companyCard = companyCard

              Object.keys(companyCard).forEach(key => {
                if (
                key !== 'cid' &&
                key !== 'owner' &&
                key !== 'created' &&
                key !== 'image') {
                  this.myCardForm.controls[key].setValue(companyCard[key])
                }
              })
            }
          })
      }
    })
  }

  private formInit(): void {
    this.myCardForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(34)
      ]],
      image: [],
      phone: [''],
      email: ['', [
        Validators.pattern(this.emailRegexp),
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      url: ['', [
        Validators.pattern(this.urlRegexp)
      ]],
      address: ['', [
        Validators.minLength(3),
        Validators.maxLength(290)
      ]],
      category: [null, [
        Validators.required
      ]],
      wysiwyg: [''],
      isShown: [false]
    })
  }

  public onImageRemove(removeImage: boolean) {
    if (removeImage) {
      this.removeImage = removeImage
      this.myCardForm.markAsDirty()
    }
  }

  public onUpload(upload: Upload) {
    if (upload) {
      this.upload = upload
    }
  }

  public publishCard(): void {
    const { uid } = this.user
    this.loading = true

    if (this.myCardForm.invalid) {
      this.loading = false
    }

    if (this.myCardForm.valid) {
      const formData: CompanyCard = this.myCardForm.value
      const companiesLink: AngularFirestoreCollection = this.fireStore.collection('companies')

      let companyData: CompanyCard = {
        ...formData,
        owner: uid,
        created: new Date()
      }

      const { image, ...formValue } = companyData

      if (this.companyCard) {
        const promises = []

        const updateCompanyData = companiesLink.doc(this.companyCard.cid)
        .set(formValue, { merge: true })

        promises.push(updateCompanyData)

        if (this.upload) {
          const updateImage = this.uploadService.publishUploads(this.upload, this.companyCard.cid).then((url: string) => {
            companiesLink.doc(this.companyCard.cid)
              .set({ image: url }, { merge: true })
          })

          promises.push(updateImage)
        }

        if (this.removeImage && !this.upload) {
          const removeImage = this.uploadService.removeImage('companies', this.companyCard.cid)
          const clearImageData = companiesLink.doc(this.companyCard.cid)
          .set({ image: "" }, { merge: true })

          promises.push(removeImage, clearImageData)
        }

        Promise.all(promises)
          .then(() => {
            this.myCardForm.markAsPristine()
            this.loading = false
            this.toastrService.success('Company information successfully saved', 'Saved')
          })
          .catch(error => {
            throw new Error(error)
            this.toastrService.danger('Something went wrong, try again later', 'Error')
          })
      }

      if (!this.companyCard) {
        companiesLink.add(formValue)
        .then((res: DocumentReference) => {
          this.userService.assignCompany(this.user.uid, res.id)
        })
      }
    }
  }

  ngOnInit() {
    this.formInit()
  }

}