import { Component, OnInit } from '@angular/core';
import { AlertsMessagesService, UserService } from './../../../../shared/services';
import { Alert, CompanyCard } from './../../../../shared/models';
import { ItemsService } from '../../services';
import { flatMap, tap, take } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'wd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  alerts: Alert[]
  itemsToShow: CompanyCard[]

  constructor(
    private readonly alertsService: AlertsMessagesService,
    private readonly itemsService: ItemsService,
  ) {
    this.alertsService.alerts$.subscribe((alerts: Alert[]) => {
      this.alerts = alerts
    })

    this.itemsService.items$.subscribe((items: CompanyCard[]) => {
      this.itemsToShow = items
    })
  }

  ngOnInit() {
    this.itemsService.getItems('companies').subscribe();
  }

}
