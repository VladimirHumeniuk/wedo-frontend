import { Injectable } from '@angular/core';
import { BaseApolloService } from '../../../shared/services/base/base.apollo.service';
import { getItemsQuery } from '../api/items.api';
import { User, CompanyCard } from 'src/app/shared/models';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

export type Item = User | CompanyCard;

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  public items$: Subject<Item[]> = new Subject();

  constructor(
    private readonly baseApolloService: BaseApolloService
  ) { }

  public getItems(type: string, search?: string, category?: number): Observable<Item[]> {
    const source = this.baseApolloService.query<{
      type: string,
      search?: string,
      category?: number
    }, Item[]>(
        getItemsQuery,
        (data) => data.getItems,
        { type, search, category }
      )
      .pipe(tap(x => this.items$.next(x)));

    return source;
  }
}
