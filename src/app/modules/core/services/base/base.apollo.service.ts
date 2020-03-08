import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { WatchQueryOptions, QueryBaseOptions, MutationOptions } from 'apollo-client';
import { map } from 'rxjs/operators';
import { DocumentNode } from 'graphql';

@Injectable({
  providedIn: 'root'
})
export class BaseApolloService {
  constructor(
    private readonly apollo: Apollo
  ) { }

  public query<TVariable, TOutput>(
    query: DocumentNode,
    mapOutput: (data: any) => TOutput,
    variables?: TVariable,
    watchQueryOptions?: WatchQueryOptions) {

    const source = this.apollo.watchQuery<Query>({
      query,
      variables,
      ...watchQueryOptions
    }).valueChanges.pipe(
      map(result => mapOutput(result.data))
    );

    return source;
  }

  public mutation<TVariable, TOutput>(
    mutation: DocumentNode,
    mapOutput: (data: any) => TOutput,
    variables?: TVariable,
    mutateOptions?: MutationOptions<TOutput, TVariable>) {

    const source = this.apollo.mutate<TOutput, TVariable>({
      mutation,
      variables,
      ...mutateOptions
    }).pipe(
      map(result => mapOutput(result.data))
    );

    return source;
  }
}
