import { Injectable } from '@angular/core';
import { BaseApolloService } from 'src/app/shared/services/base/base.apollo.service';
import { Observable } from 'rxjs/Observable';
import { Comment } from '../models';
import { getCompanyCommentsQuery } from 'src/app/shared/api/comments.api';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(
    private readonly baseApolloService: BaseApolloService,
  ) { }

  public getCompanyComments(companyId: string): Observable<Comment[]> {
    const source = this.baseApolloService.query<{cid: string}, Comment[]>(
      getCompanyCommentsQuery,
      (data) => data.getCompanyComments,
      { cid: companyId });
    return source;
  }
}
