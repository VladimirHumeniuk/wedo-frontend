import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { BaseApolloService } from 'src/app/modules/core/services-apollo/base/base.apollo.service';
import { User } from 'firebase';
import { getAllUsersQuery } from './user.api';
import { Observable } from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
})
export class UserApolloService {
    constructor(private readonly baseApolloService: BaseApolloService) {
    }

    public getAllUsers(): Observable<User[]> {
        const source = this.baseApolloService.query<{}, User[]>(getAllUsersQuery, (data) => data.users);
        return source;
    }
}
