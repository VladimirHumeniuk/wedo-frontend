import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { Observable } from 'rxjs';
import { SearchResult } from '../models';
import { BaseApolloService } from './base/base.apollo.service';
import { indexSearchQuery } from '../api/algolia.api';

@Injectable({
  providedIn: 'root'
})
export class AlgoliaService {

  constructor(
    private readonly baseApolloService: BaseApolloService
  ) { }

  public indexSearch(collection: string, hitsPerPage: number, query?: string, filters?: string, page?: number): Observable<SearchResult> {
    const source = this.baseApolloService.query<{
      collection: string;
      hitsPerPage: number,
      query: string;
      filters: string;
      page: number;
    }, SearchResult> (
      indexSearchQuery, (data) => data.indexSearch, {
        collection,
        hitsPerPage,
        query,
        filters,
        page
      }
    );

    return source;
  }

}
