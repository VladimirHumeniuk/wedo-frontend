import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { WatchQueryOptions, QueryBaseOptions } from 'apollo-client';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BaseApolloService {
    constructor(private readonly apollo: Apollo) {
    }

    public query<TVariable, TOutput>(
        query: QueryBaseOptions<TVariable>,
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
}
