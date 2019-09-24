import { Component, OnInit } from '@angular/core';
import { AlertsMessagesService } from './../../../../shared/services';
import { Alert, CompanyCard } from './../../../../shared/models';
import { ItemsService } from '../../services';
import { BaseApolloService } from '../../services-apollo/base/base.apollo.service';
import { UserApolloService } from 'src/app/shared/services-apollo/user.apollo.service';
import { flatMap, tap, zip, mergeMap, take } from 'rxjs/operators';
import { forkJoin, of, combineLatest } from 'rxjs';

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
  }

}
