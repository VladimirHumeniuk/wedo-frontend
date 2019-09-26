import { Injectable } from '@angular/core';
import { BaseApolloService } from './base/base.apollo.service';
import { getItemsQuery } from './items.api';
import { User, CompanyCard } from 'src/app/shared/models';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

export type Item = User | CompanyCard;

@Injectable({
  providedIn: 'root'
})
export class ItemsApolloService {

  public items$: Subject<Item[]> = new Subject();
  constructor(private readonly baseApolloService: BaseApolloService) {
  }

  public getItems(type: string, search?: string, category?: string): Observable<Item[]> {
    const source = this.baseApolloService.query<{
      type: string,
      search?: string,
      category?: string
    }, Item[]>(
        getItemsQuery,
        (data) => data.getItems,
        { type, search, category }
      )
      .pipe(tap(x => this.items$.next(x)));

    return source;
  }
}
