import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoriesService, UploadService, CompaniesService } from 'src/app/shared/services';
import { NbToastrService } from '@nebular/theme';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { SafeComponent } from 'src/app/shared/helpers';
import { EMAIL_REGEXP, URL_REGEXP, FORMS_MESSAGES } from 'src/app/shared/constants';
import { Upload, CompanyCard, Category } from 'src/app/shared/models';
import { takeUntil, tap, delay, take, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'wd-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent extends SafeComponent implements OnInit {

  public cid: string;
  public prevOwner: string;

  public editCompanyForm: FormGroup;
  public loading: boolean;
  public upload: Upload;
  public companyCard: CompanyCard;

  private removeImage: boolean;
  private emailRegexp: RegExp = EMAIL_REGEXP;
  private urlRegexp: RegExp = URL_REGEXP;

  public categories: Category[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly fireStore: AngularFirestore,
    private readonly uploadService: UploadService,
    private readonly toastrService: NbToastrService,
    private readonly store: Store<AppState>,
    private readonly categoriesService: CategoriesService,
    private readonly companiesService: CompaniesService
  ) {
    super();
  }

  private getAllCategories(): void {
    const getFromStore = this.categoriesService.categories$.pipe(
      takeUntil(this.unsubscriber),
      tap(categories => this.categories = categories)
    ).subscribe()

    Promise.all([getFromStore]).then(() => {
      if (!this.categories.length) {
        this.categoriesService.getAllCategories().pipe(
          takeUntil(this.unsubscriber),
          tap(categories => this.categories = categories)
        ).subscribe()
      }
    })
  }

  private formInit(): void {
    this.editCompanyForm = this.formBuilder.group({
      cid: ['ID will be generated automatically', [
        Validators.required
      ]],
      owner: [''],
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

  public companyDataToForm(company: CompanyCard): void {
    this.cid = company.cid
    let date: Date

    if (company.created && '_seconds' in company.created) {
      date = new Date(company.created._seconds * 1000)
    }

    Object.keys(company).forEach((key: string) => {
      if (this.editCompanyForm.controls[key]) {
        switch (key) {
          case 'image':
            break;

          case 'created':
            this.editCompanyForm.controls['created'].setValue(date);
            break;

          default:
            this.editCompanyForm.controls[key].setValue(company[key]);
            break;
        }
      }
    })
  }

  public onImageRemove(removeImage: boolean) {
    if (removeImage) {
      this.removeImage = removeImage
      this.editCompanyForm.markAsDirty()
    }
  }

  public onUpload(upload: Upload) {
    if (upload) {
      this.upload = upload
    }
  }

  public publishCard(): void {
    this.loading = true

    if (this.editCompanyForm.invalid) {
      this.loading = false
    }

    if (this.editCompanyForm.valid) {
      const formData: CompanyCard = this.editCompanyForm.value
      const companiesLink: AngularFirestoreCollection = this.fireStore.collection('companies')
      const usersLink: AngularFirestoreCollection = this.fireStore.collection('users')

      let companyData: CompanyCard = {
        ...formData
      }

      const { image, ...formValue } = companyData

      if (Object.keys(this.companyCard).length !== 0) {
        const promises = []

        const updateCompanyData = companiesLink.doc(this.companyCard.cid)
          .set(formValue, { merge: true })

        promises.push(updateCompanyData)

        if (this.prevOwner !== companyData.owner) {
          if (this.prevOwner) {
            this.fireStore.collection('users').doc(this.prevOwner).set({ company: '' }, { merge: true })
          }

          if (companyData.owner) {
            this.fireStore.collection('users').doc(companyData.owner).set({ company: companyData.cid }, { merge: true })
          }
        }

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
            this.editCompanyForm.markAsPristine()
            this.toastrService.success('Company information successfully saved', 'Saved')
          })
          .catch(error => {
            throw new Error(error)
            this.toastrService.danger('Something went wrong, try again later', 'Error')
          })
          .finally(() => {
            this.prevOwner = companyData.owner
            this.loading = false
          })
      }

      if (Object.keys(this.companyCard).length === 0) {
        const newCompany = { ...formValue, created: new Date() }

        companiesLink.add(newCompany)
          .then((res: DocumentReference) => {
            companiesLink.doc(res.id).set({ cid: res.id }, { merge: true })

            if (newCompany.owner) {
              this.companiesService.assignCompany(newCompany.owner, res.id).subscribe()
            }
          }).then(() => {
            this.editCompanyForm.markAsPristine()
            this.toastrService.success('Company information successfully saved', 'Saved')
          }).catch(error => {
            throw new Error(error)
            this.toastrService.danger('Something went wrong, try again later', 'Error')
          }).finally(() => {
            this.prevOwner = formValue.owner
            this.loading = false
          })
      }
    }
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.formInit();

    this.activatedRoute.queryParams
    .pipe(
      delay(0),
      take(1),
      takeUntil(this.unsubscriber)
    ).subscribe((data: Params) => {
      this.store.select('admin').pipe(
        map((state) => {
          const companyFromState = state.companies.filter(company => company.cid === data.id)
          const company = Object.assign({}, companyFromState[0])
          return company
        })
      ).subscribe((company: CompanyCard) => {
        if (company) {
          this.companyCard = company
          this.prevOwner = company.owner
        }

        if (company && company.cid) {
          this.companyDataToForm(company)
        } else {
          this.companiesService.getCompany(data.id).pipe(
            take(1),
            takeUntil(this.unsubscriber)
          ).subscribe((company: CompanyCard) => {
            if (company) {
              this.companyCard = company
              this.prevOwner = company.owner
              this.companyDataToForm(company)
            }
          })
        }
      })
  })
  }

}
