import { Component, OnInit } from '@angular/core';
import { CategoriesService, CountersService } from 'src/app/shared/services';
import { Category } from 'src/app/shared/models';
import { map, tap, takeUntil } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { SafeComponent } from 'src/app/shared/helpers';
import { GetAllCategories, RemoveCategory } from 'src/app/store/actions/categories.action';

@Component({
  selector: 'wd-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends SafeComponent implements OnInit {

  private counterRef: DocumentReference = this.fireStore.collection('counters').doc('categories').ref

  public categories: Category[]

  public tableColumns = [
    { title: 'ID', key: 'id', options: { code: true } },
    { title: 'Category name', key: 'title' }
  ]
  public actions = { edit: true, remove: true }

  constructor(
    private readonly fireStore: AngularFirestore,
    private readonly categoriesService: CategoriesService,
    private readonly toastrService: NbToastrService,
    private readonly store: Store<AppState>,
    private readonly countersService: CountersService
  ) {
    super();
  }

  public categoryRemove(id: number): void {
    this.store.dispatch(new RemoveCategory({ id }))
    this.countersService.updateCounter(this.counterRef, 5, -1)
    this.toastrService.success('Category removed', 'Removed',
      { icon: 'trash-2-outline' }
    )
  }

  ngOnInit() {
    this.store.dispatch(new GetAllCategories())
    this.categoriesService.categories$
      .pipe(
        takeUntil(this.unsubscriber),
        map((data: Category[]) => [...data.map(category => ({...category}))]),
        tap(categories => this.categories = categories)
      ).subscribe()
  }

}
