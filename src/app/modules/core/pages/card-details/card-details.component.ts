import { Component, OnInit } from '@angular/core';
import { CompaniesService, CategoriesService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';
import { CompanyCard, Category } from 'src/app/shared/models';
import { SafeComponent } from 'src/app/shared/helpers';
import { takeUntil, take, map } from 'rxjs/operators';

@Component({
  selector: 'wd-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent extends SafeComponent implements OnInit {

  private cid: string;
  public cardDetails: CompanyCard;
  public categories: Category[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly companiesService: CompaniesService,
    private readonly categoriesService: CategoriesService
  ) {
    super()
  }

  public getCategoryTitle(id: number) {
    this.cardDetails.category = this.categoriesService.getCategoryTitle(id)

    if (!this.cardDetails.category) {
      this.categoriesService.getCategory(id)
        .pipe(
          take(1),
          takeUntil(this.unsubscriber),
          map(category => {
            this.cardDetails.category = category.title
          })
        ).subscribe()
    }
  }

  public getCompany(cid: string): void {
    this.companiesService.getCompany(cid)
    .pipe(
      take(1),
      takeUntil(this.unsubscriber)
    )
    .subscribe((companyCard: CompanyCard) => {
      this.cardDetails = companyCard
      if (typeof companyCard.category === 'number') this.getCategoryTitle(companyCard.category)
    })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const cid = params.get('cid')
      this.getCompany(cid)
    })
  }
}
