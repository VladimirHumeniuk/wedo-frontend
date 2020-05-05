import { Component, Input, OnInit } from '@angular/core';
import { CompanyCard, Category } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/shared/services';
import { SafeComponent } from 'src/app/shared/helpers';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'wd-cards-grid',
  templateUrl: './cards-grid.component.html',
  styleUrls: ['./cards-grid.component.scss']
})
export class CardsGridComponent extends SafeComponent implements OnInit {

  @Input() items: CompanyCard[];

  public categories: Category[];

  constructor(
    private readonly categoriesService: CategoriesService
  ) {
    super()
  }

  public getCategoryTitle(id: number): string {
    return this.categoriesService.getCategoryTitle(id)
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
