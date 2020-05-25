import { Injectable } from '@angular/core';
import { BaseApolloService } from 'src/app/shared/services/base/base.apollo.service';
import { Observable } from 'rxjs/Observable';
import { Comment } from '../models';
import { getCompanyCommentsQuery, setCommentMutation, addCommentMutation } from 'src/app/shared/api/comments.api';

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

  public addComment(companyId: string, comment: Comment): Observable<boolean> {
    const source$ = this.baseApolloService.mutation<{companyId: string, comment: Comment}, boolean>(
        addCommentMutation,
        data => data.addComment, {
            companyId,
            comment,
        }
    );

    return source$;
  }

  public setComment(companyId: string, comment: Comment): Observable<boolean> {
    const source$ = this.baseApolloService.mutation<{companyId: string, comment: Comment}, boolean>(
        setCommentMutation,
        data => data.setComment, {
            companyId,
            comment,
        }
    );

    return source$;
  }
}
