import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category, Popular } from '../models';
import { Observable, of } from 'rxjs';
import { BaseApolloService } from 'src/app/shared/services/base/base.apollo.service';
import {
  getAllCategoriesQuery,
  getCategoryQuery,
  getPopularQuery,
  addCategoryMutation,
  removeCategoryMutation
} from '../api/categories.api';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { map, tap, take, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { SafeComponent } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends SafeComponent {

  public categories$ = this.store.select('category').pipe(map(x => x.categories));

  constructor(
    private readonly baseApolloService: BaseApolloService,
    private readonly fireStore: AngularFirestore,
    private readonly store: Store<AppState>
  ) {
    super()
  }

  public getCategory(id: number): Observable<Category> {
    const source$ = this.baseApolloService.query<{ id: number }, Category>(getCategoryQuery, (data) => data.getCategory, { id });
    return source$;
  }

  public getPopular(): Observable<any[]> {
    const source$ = this.baseApolloService.query<{}, Popular[]>(
      getPopularQuery, (data) => data.getPopular
    )
    return source$;
  }

  public getAllCategories(): Observable<Category[]> {
    const source$ = this.baseApolloService.query<{}, Category[]>(getAllCategoriesQuery, (data) => data.getAllCategories);
    return source$;
  }

  public addCategory(category: Category): Observable<boolean> {
    const source$ = this.baseApolloService.mutation<
      {
        category: Category
      },
      boolean
    >(addCategoryMutation, data => data.addCategory, {
      category
    });

    return source$;
  }

  public getCategoryTitle(id: number) {
    let categoryTitle: string

    this.categories$.pipe(
      map(data => data.filter(c => c.id === id))
    ).subscribe(category => {
      if (category[0]) categoryTitle = category[0].title
    })

    return categoryTitle
  }

  public removeCategory(id: number): Observable<boolean> {
    const source$ = this.baseApolloService.mutation<
      {
        id: number
      },
      boolean
    >(removeCategoryMutation, data => data.removeCategory, {
      id
    })

    return source$;
  }

}
