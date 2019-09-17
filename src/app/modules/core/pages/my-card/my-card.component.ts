import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentData, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EMAIL_REGEXP, URL_REGEXP, FORMS_MESSAGES } from 'src/app/shared/constants';
import { CompanyCard, User, Upload } from './../../../../shared/models';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UploadService, UserService } from 'src/app/shared/services';
import { map } from 'rxjs/operators';

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
  public companyCard: CompanyCard

  private emailRegexp: RegExp = EMAIL_REGEXP
  private urlRegexp: RegExp = URL_REGEXP

  public categories = ['Cats', 'Dogs'] // todo

  constructor(
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
          .then((company: firebase.firestore.DocumentSnapshot) => {
            const companyCard = company.data() as CompanyCard

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

  public onUpload(upload: Upload) {
    if (upload) {
      this.upload = upload
    }
  }

  public uploadImage() {
    return this.uploadService.publishUploads(this.upload, this.user.uid)
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

      if (this.companyCard) {
        const promises = []

        const updateCompanyData = companiesLink.doc(this.companyCard.cid)
        .set(companyData, { merge: true })

        promises.push(updateCompanyData)

        if (this.upload) {
          const updateImage = this.uploadImage().then((url: string) => {
            companiesLink.doc(this.companyCard.cid)
              .set({ image: url }, { merge: true })
          })

          promises.push(updateImage)
        }

        Promise.all(promises).then(() => this.loading = false)
      }

      if (!this.companyCard) {
        companiesLink.add(companyData)
        .then(res => {
          this.userService.assignCompany(this.user.uid, res.id)
        })
      }
    }
  }

  ngOnInit() {
    this.formInit()
  }

}
