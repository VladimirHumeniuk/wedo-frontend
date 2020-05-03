import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EMAIL_REGEXP, URL_REGEXP, FORMS_MESSAGES } from 'src/app/shared/constants';
import { CompanyCard, User, Upload, Category } from '../../../../shared/models';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { UploadService, UserService, CategoriesService } from 'src/app/shared/services';

@Component({
  selector: 'wd-my-company-card',
  templateUrl: './my-company-card.component.html',
  styleUrls: ['./my-company-card.component.scss']
})
export class MyCompanyCardComponent implements OnInit, OnDestroy {

  public myCardForm: FormGroup;

  private _user: Subscription;
  public user$: Observable<User> = this.store.select('user');
  public user: User;

  public loading: boolean;
  public upload: Upload;
  public companyCard: CompanyCard;

  private removeImage: boolean;
  private emailRegexp: RegExp = EMAIL_REGEXP;
  private urlRegexp: RegExp = URL_REGEXP;

  private _categories: Subscription;
  public categories: Category[] = [];

  constructor(
    private readonly toastrService: NbToastrService,
    private readonly fireStore: AngularFirestore,
    private readonly formBuilder: FormBuilder,
    private readonly uploadService: UploadService,
    private readonly store: Store<AppState>,
    private readonly userService: UserService,
    private readonly categoriesService: CategoriesService
  ) { }

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
        Validators.email,
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
      shortDescription: ['', [
        Validators.required,
        Validators.maxLength(140)
      ]],
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

  private getAllCategories(): void {
    this._categories = this.categoriesService.getAllCategories().pipe(
      take(1)
    ).subscribe((categories: Category[]) => {
      this.categories = categories
    })
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
            this.toastrService.success('Company information successfully saved', 'Saved')
          })
          .catch(error => {
            throw new Error(error)
            this.toastrService.danger('Something went wrong, try again later', 'Error')
          })
          .finally(() => {
            this.loading = false
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

  ngOnDestroy() {
    this._user.unsubscribe()
    this._categories.unsubscribe()
  }

  ngOnInit() {
    this.formInit()
    this.getAllCategories()

    this._user = this.user$.pipe(
      take(1)
    ).subscribe((user: User) => {
      this.user = user

      if (user) {
        this.userService.getUserCompany(user.company)
          .subscribe((companyCard: CompanyCard) => {
            if (companyCard) {
              this.companyCard = companyCard
              Object.keys(companyCard).forEach((key: string) => {
                if (
                  this.myCardForm.controls[key] &&
                  key !== 'image'
                ) {
                  this.myCardForm.controls[key].setValue(companyCard[key])
                }
              })
            }
          })
      }
    });
  }

}
