import { GET_ALL_COMPANY_COMMENTS } from 'src/app/store/actions/comment.action';
import { Component, OnInit } from '@angular/core';
import { CompaniesService, CategoriesService, CountersService, RatingService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { CompanyCard, Category } from 'src/app/shared/models';
import { SafeComponent } from 'src/app/shared/helpers';
import { takeUntil, take, map, tap } from 'rxjs/operators';
import { Loader } from 'src/app/shared/helpers/loader';

@Component({
  selector: 'wd-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent extends SafeComponent implements OnInit {

  private cid: string;
  public cardDetails: CompanyCard;
  public categories: Category[];

  public rating: number;
  public feedbacksCounter: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fireStore: AngularFirestore,
    private readonly companiesService: CompaniesService,
    private readonly categoriesService: CategoriesService,
    private readonly countersService: CountersService,
    private readonly ratingService: RatingService
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

      this.countersService.getCount(
        this.fireStore.collection('counters').doc('stars').collection('companies').doc(cid).ref
      ).then(amount => this.feedbacksCounter = amount)
    })
  }
}
