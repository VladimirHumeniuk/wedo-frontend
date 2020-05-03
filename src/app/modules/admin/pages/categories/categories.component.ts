import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services';
import { Category } from 'src/app/shared/models';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'wd-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  public categories: Category[]
  private _categories: Subscription

  public tableColumns = [
    { title: '#id', key: 'id', options: { code: true } },
    { title: 'Category name', key: 'title' }
  ]
  public actions = { edit: true, remove: true }

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly toastrService: NbToastrService
  ) { }

  ngOnDestroy() {
    this._categories.unsubscribe()
  }

  public categoryRemove(id: number): void {
    this.categoriesService.removeCategory(id).toPromise()
      .then(() => {
        this.toastrService.success('Category removed', 'Removed',
          { icon: 'trash-2-outline' }
        )
      })
  }

  ngOnInit() {
    this._categories = this.categoriesService.getAllCategories().pipe(
      take(1)
    ).subscribe((categories: Category[]) => {
      this.categories = categories
    })
  }

}
