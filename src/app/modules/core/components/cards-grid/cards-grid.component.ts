import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CompanyCard, Category } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { CategoriesService, CountersService } from 'src/app/shared/services';
import { SafeComponent } from 'src/app/shared/helpers';
import { takeUntil, take, tap } from 'rxjs/operators';
import { RatingService } from 'src/app/shared/services/rating.service';

@Component({
  selector: 'wd-cards-grid',
  templateUrl: './cards-grid.component.html',
  styleUrls: ['./cards-grid.component.scss']
})
export class CardsGridComponent extends SafeComponent implements OnInit {

  @Input() items: CompanyCard[];
  @Input() total: number;
  @Output() currentPage: EventEmitter<number> = new EventEmitter()

  public categories: Category[];
  public p: number = 1;

  public changePage(page: number): void {
    this.p = page
    this.currentPage.emit(page)
  }

  constructor(
    private readonly fireStore: AngularFirestore,
    private readonly categoriesService: CategoriesService,
    private readonly ratingService: RatingService,
    private readonly countersService: CountersService
  ) {
    super()
  }

  public getCategoryTitle(id: number): string {
    return this.categoriesService.getCategoryTitle(id)
  }

  public getCardRating(cid: string): number {
    let rating

    this.ratingService.getCompanyStars(cid).pipe(
      take(1),
      tap(val => rating = val)
    ).subscribe()

    return rating
  }

  ngOnInit() {
    this.categoriesService.categories$
      .pipe(
        takeUntil(this.unsubscriber),
        tap((categories: Category[]) => (this.categories = categories))
      )
      .subscribe();
  }

}
