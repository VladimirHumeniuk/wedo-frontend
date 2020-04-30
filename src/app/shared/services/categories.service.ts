import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from '../models';
import { Observable } from 'rxjs';
import { BaseApolloService } from 'src/app/shared/services/base/base.apollo.service';
import { getAllCategoriesQuery } from '../api/categories.api';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private readonly baseApolloService: BaseApolloService,
    private readonly fireStore: AngularFirestore
  ) { }

  public getAllCategories(): Observable<Category[]> {
    const source = this.baseApolloService.query<{}, Category[]>(getAllCategoriesQuery, (data) => data.getAllCategories);
    return source;
  }

}
