import { Component, OnInit } from '@angular/core';
import { AlertsMessagesService } from './../../../../shared/services';
import { Alert, CompanyCard } from './../../../../shared/models';
import { ItemsService } from '../../services';
import { UserApolloService } from 'src/app/shared/services-apollo/user.apollo.service';
import { flatMap, tap, take } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { ItemsApolloService } from '../../services-apollo/items.apollo.service';
import { AlertsMessagesApolloService } from 'src/app/shared/services-apollo/alerts-messages.apollos.service';

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
    private readonly itemsApolloService: ItemsApolloService,
    private readonly alertsApolloSerivce: AlertsMessagesApolloService
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
    const source1 = this.userApolloService.getAllUsers()
      .pipe(
        flatMap(x => this.userApolloService.getUser(x[0].uid)),
        tap(x => console.log('OLOLO', x))
      );

    const source2 = this.userApolloService.getAllCompanies()
      .pipe(
        flatMap(x => this.userApolloService.getCompany(x[0].cid)),
        tap(x => console.log('OLOLO 2', x))
      );

    combineLatest(source1, source2)
      .pipe(take(1), flatMap((result) => {
        console.log("Vd0", result[0], result[1]);
        return this.userApolloService.assignCompany(result[0].uid, result[1].cid);
      })).subscribe();

    this.itemsApolloService
      .getItems('users')
      .subscribe(x => console.log('Items', x));

    this.alertsApolloSerivce
      .getAllAlerts()
      .subscribe(x => console.log('Alerts', x));
  }

}
