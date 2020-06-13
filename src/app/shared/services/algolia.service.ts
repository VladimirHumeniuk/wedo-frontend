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

  public indexSearch(
    collection: string,
    query: string,
    hitsPerPage: number,
    page?: number,
    filters?: string
  ): Observable<SearchResult> {
    const source = this.baseApolloService.query<{
      collection: string;
      query: string;
      hitsPerPage: number;
      page: number;
      filters: string;
    }, SearchResult> (
      indexSearchQuery, (data) => data.indexSearch, {
        collection,
        query,
        hitsPerPage,
        page,
        filters
      }
    );

    return source;
  }

}
