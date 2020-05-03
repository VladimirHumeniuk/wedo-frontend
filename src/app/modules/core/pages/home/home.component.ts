import { Component, OnInit } from '@angular/core';
import { AlertsMessagesService, UserService } from './../../../../shared/services';
import { Alert, CompanyCard } from './../../../../shared/models';
import { ItemsService } from '../../services';
import { tap, first } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { GetAllAlerts } from 'src/app/store/actions/alert.action';

@Component({
  selector: 'wd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public alerts: Alert[]
  public itemsToShow: CompanyCard[]

  constructor(
    private readonly alertsService: AlertsMessagesService,
    private readonly itemsService: ItemsService,
    private readonly userService: UserService,
    private readonly store: Store<AppState>,
  ) {
    this.alertsService.alerts$.subscribe((alerts: Alert[]) => {
      this.alerts = alerts
    })
  }

  ngOnInit(): void {
    this.itemsService.items$.subscribe((items: CompanyCard[]) => {
      this.itemsToShow = items
    })

    this.itemsService.getItems('companies').subscribe();

    this.userService.user$.pipe(
      first(),
      tap(({ uid }) => this.store.dispatch(new GetAllAlerts({ uid })))
    ).subscribe();
  }

}
