import { Component, OnInit } from '@angular/core';
import { AlertsMessagesService } from './../../../../shared/services';
import { Alert, CompanyCard } from './../../../../shared/models';
import { ItemsService } from '../../services';
import { BaseApolloService } from '../../services-apollo/base/base.apollo.service';
import { UserApolloService } from 'src/app/shared/services-apollo/user.apollo.service';
import { flatMap, tap } from 'rxjs/operators';

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
    private readonly userApolloService: UserApolloService,
  ) {
    this.alertsService.alerts$.subscribe((alerts: Alert[]) => {
      this.alerts = alerts
    })

    this.itemsService.items$.subscribe((items: CompanyCard[]) => {
      this.itemsToShow = items
    })
  }

  ngOnInit() {
    this.itemsService.getItems('companies');
    this.userApolloService.getAllUsers()
      .pipe(
        flatMap(x => this.userApolloService.getUser(x[0].uid)),
        tap(x => console.log('OLOLO', x))
      ).subscribe();

    this.userApolloService.getAllCompanies()
      .pipe(
        flatMap(x => this.userApolloService.getCompany(x[0].cid)),
        tap(x => console.log('OLOLO 2', x))
      ).subscribe();
  }

}
