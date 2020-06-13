import { Component, OnInit } from '@angular/core';
import { AlertsMessagesService, UserService, CategoriesService, CompaniesService } from './../../../../shared/services';
import { Alert, CompanyPreview } from './../../../../shared/models';
import { tap, first, takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { GetAllAlerts } from 'src/app/store/actions/alert.action';
import { GetAllCategories } from 'src/app/store/actions/categories.action';
import { SafeComponent } from 'src/app/shared/helpers';

@Component({
  selector: 'wd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends SafeComponent implements OnInit {

  public alerts: Alert[];
  public itemsToShow: CompanyPreview[];
  public total: number;
  public searchPage: number = 1;

  constructor(
    private readonly alertsService: AlertsMessagesService,
    private readonly userService: UserService,
    private readonly store: Store<AppState>,
    private readonly companiesService: CompaniesService
  ) {
    super()

    this.alertsService.alerts$.subscribe((alerts: Alert[]) => {
      this.alerts = alerts
    })
  }

  public passCurrentPage(page: number): void {
    if (page) this.searchPage = page
  }

  public searchHandler(result: any): void {
    if (result) this.itemsToShow = result
  }

  public totalHandler(result: any): void {
    if (result) this.total = result
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllCategories())

    this.userService.user$.pipe(
      takeUntil(this.unsubscriber),
      first(),
      tap(({ uid }) => this.store.dispatch(new GetAllAlerts({ uid })))
    ).subscribe();
  }

}
