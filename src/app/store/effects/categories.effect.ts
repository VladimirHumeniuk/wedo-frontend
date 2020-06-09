import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, catchError, switchMap } from 'rxjs/operators';
import { CategoriesService } from 'src/app/shared/services';

import {
  GET_ALL_CATEGORIES,
  GET_POPULAR,
  REMOVE_CATEGORY,
  GetAllCategoriesSuccess,
  GetAllCategoriesError,
  GetAllCategories,
  GetPopularCategoriesSuccess,
  GetPopularCategoriesError,
  RemoveCategory,
  RemoveCategorySuccess,
  RemoveCategoryError
} from 'src/app/store/actions/categories.action';

@Injectable()
export class CategoriesEffects {
  constructor(
    private readonly actions: Actions,
    private readonly categoriesService: CategoriesService
  ) {}

  @Effect()
  getAllCategories$: Observable<Action> = this.actions.pipe(
    ofType(GET_ALL_CATEGORIES),
    switchMap(_ => this.categoriesService.getAllCategories()),
    map(categories => new GetAllCategoriesSuccess({ categories })),
    catchError(_ => of(new GetAllCategoriesError()))
  );

  @Effect()
  getPopularCategories$: Observable<Action> = this.actions.pipe(
    ofType(GET_POPULAR),
    switchMap(_ => this.categoriesService.getPopular()),
    map(popular => new GetPopularCategoriesSuccess({ popular })),
    catchError(_ => of(new GetAllCategoriesError()))
  );

  @Effect()
  removeCategory$: Observable<Action> = this.actions.pipe(
    ofType(REMOVE_CATEGORY),
    switchMap((action: RemoveCategory) =>
      this.categoriesService
        .removeCategory(action.payload.id)
        .pipe(
          map(_ => ({ id: action.payload.id }))
        )
    ),
    switchMap(({ id }) => [
      new RemoveCategorySuccess({ id }),
      new GetAllCategories()
    ]),
    catchError(x => of(new RemoveCategoryError()))
  );
}
