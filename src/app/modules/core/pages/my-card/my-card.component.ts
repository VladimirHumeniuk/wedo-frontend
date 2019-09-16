import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EMAIL_REGEXP, URL_REGEXP, FORMS_MESSAGES } from 'src/app/shared/constants';
import { CompanyCard, User, Upload } from './../../../../shared/models';
import { UploadService } from 'src/app/shared/services/upload.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'wd-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.scss']
})
export class MyCardComponent implements OnInit {

  public user$: Observable<User> = this.store.select('user')
  public user: User
  public myCardForm: FormGroup
  public loading: boolean
  public upload: Upload

  private emailRegexp: RegExp = EMAIL_REGEXP
  private urlRegexp: RegExp = URL_REGEXP

  public categories = ['Cats', 'Dogs'] // todo

  constructor(
    private fireStore: AngularFirestore,
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private store: Store<AppState>
  ) {
    this.user$.subscribe((user: User) => {
      this.user = user
    })
  }

  private formInit(): void {
    this.myCardForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(34)
      ]],
      image: [null],
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

  public onUpload(upload: Upload) {
    if (upload) {
      this.upload = upload
    }
  }

  public uploadImage() {
    return this.uploadService.publishUploads(this.upload, this.user.uid)
  }

  public publishCard(): void {
    this.loading = true

    if (this.myCardForm.invalid) {
      this.loading = false
    }

    if (this.myCardForm.valid) {
      const formData: CompanyCard = this.myCardForm.value
      const companiesLink: AngularFirestoreDocument<DocumentData> = this.fireStore.doc(`companies/${this.user.uid}/`)

      let companyData: CompanyCard = {
        ...formData,
        owner: this.user.uid,
        created: new Date()
      }

      if (this.upload) {
        this.uploadImage().then((url: string) => {
          companiesLink.set({ image: url }, { merge: true })
        })
      }

      companiesLink.set(companyData, { merge: true })
        .then(() => this.loading = false)
    }
  }

  ngOnInit() {
    this.formInit()
  }

}
