import { Component, OnInit } from '@angular/core';
import { AlertsMessagesService, UserService, CategoriesService, CompaniesService } from './../../../../shared/services';
import { Alert, CompanyPreview } from './../../../../shared/models';
import { ItemsService } from '../../services';
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

  alerts: Alert[]
  itemsToShow: CompanyPreview[]

  constructor(
    private readonly alertsService: AlertsMessagesService,
    private readonly itemsService: ItemsService,
    private readonly userService: UserService,
    private readonly store: Store<AppState>,
    private readonly companiesService: CompaniesService
  ) {
    super()

    this.alertsService.alerts$.subscribe((alerts: Alert[]) => {
      this.alerts = alerts
    })
  }

  public searchHandler(result: any) {
    if (result) this.itemsToShow = result
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllCategories())

    this.userService.user$.pipe(
      first(),
      tap(({ uid }) => this.store.dispatch(new GetAllAlerts({ uid })))
    ).subscribe();
  }

}
