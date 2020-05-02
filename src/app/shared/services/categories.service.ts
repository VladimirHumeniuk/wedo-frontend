import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from '../models';
import { Observable } from 'rxjs';
import { BaseApolloService } from 'src/app/shared/services/base/base.apollo.service';
import {
  getAllCategoriesQuery,
  getCategoryQuery,
  addCategoryMutation,
  removeCategoryMutation
} from '../api/categories.api';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private readonly baseApolloService: BaseApolloService,
    private readonly fireStore: AngularFirestore
  ) { }

  public getCategory(id: number): Observable<Category> {
    const source$ = this.baseApolloService.query<{ id: number }, Category>(getCategoryQuery, (data) => data.getCategory, { id });
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
