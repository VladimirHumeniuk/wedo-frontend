import { Component, OnInit } from '@angular/core';
import { SafeComponent } from 'src/app/shared/helpers';
import { CompanyCard, User, Category } from 'src/app/shared/models';
import { UserService, CategoriesService, CountersService } from 'src/app/shared/services';
import { GetAllCompanies, RemoveCompany } from 'src/app/store/actions/companies.action';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { takeUntil, map, tap, take, delay, switchMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { NbToastrService } from '@nebular/theme';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'wd-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent extends SafeComponent implements OnInit {

  public tableColumns = [
    { title: 'ID', key: 'cid', options: { code: true } },
    { title: 'Title', key: 'title' },
    { title: 'Description', key: 'shortDescription', options: { minWidth: 260 } },
    { title: 'Category', key: 'category' },
    { title: 'Created', key: 'created', options: { date: true } },
    { title: 'Visible', key: 'isShown', options: { bool: true, align: 'center' } }
  ]
  public actions = { edit: true, remove: true }
  public companies: CompanyCard[]
  public loading: boolean

  public total: number

  constructor(
    private readonly fireStore: AngularFirestore,
    private readonly userService: UserService,
    private readonly categoriesService: CategoriesService,
    private readonly adminService: AdminService,
    private readonly store: Store<AppState>,
    private readonly toastrService: NbToastrService,
    private readonly countersService: CountersService
  ) {
    super();
  }

  public companyRemove(cid: string): void {
    this.store.dispatch(new RemoveCompany({ cid }))
    this.toastrService.success('Company removed', 'Removed',
      { icon: 'trash-2-outline' }
    )
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllCompanies())

    this.loading = true
    this.adminService.companies$
      .pipe(
        takeUntil(this.unsubscriber),
        map((data: CompanyCard[]) => data.map(company => '_seconds' in company.created
          ? ({ ...company, created: new Date(company.created._seconds * 1000) })
          : company
        )),
        switchMap((data: CompanyCard[]) => forkJoin(data.map(company => {
          if (typeof company.category === 'number') {
            return this.categoriesService.getCategory(company.category).pipe(
              take(1),
              map((category: Category) => ({ ...company, category: category.title }))
            )
          }

          return of(company)
        }))),
        tap(companies => {
          this.loading = false
          this.companies = companies
        })
      )
      .subscribe();
  }

}
