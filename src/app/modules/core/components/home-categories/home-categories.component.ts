import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CountersService, CategoriesService } from 'src/app/shared/services';
import { Observable } from 'rxjs';
import { tap, takeUntil, map, take } from 'rxjs/operators';
import { SafeComponent } from 'src/app/shared/helpers';
import { GetPopularCategories } from 'src/app/store/actions/categories.action';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Popular } from 'src/app/shared/models';

@Component({
  selector: 'wd-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.scss']
})
export class HomeCategoriesComponent extends SafeComponent implements OnInit {

  private categories$: Observable<any> = this.fireStore.collection('counters').doc('companies-by-categories').collection('categories').get()
  public popular: Popular[] = []

  constructor(
    private readonly store: Store<AppState>,
    private readonly fireStore: AngularFirestore,
    private readonly countersService: CountersService,
    private readonly categoriesService: CategoriesService
  ) {
    super();
  }

  public getCategoryTitle(id: number): string {
    return this.categoriesService.getCategoryTitle(id)
  }

  ngOnInit(): void {
    this.store.dispatch(new GetPopularCategories())

    this.store.select('category').pipe(
      takeUntil(this.unsubscriber),
      map(({ popular }) => popular),
      tap(data => this.popular = data)
    ).subscribe()
  }

}
