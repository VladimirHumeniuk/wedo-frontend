import { Injectable } from '@angular/core';
import { BaseApolloService } from 'src/app/shared/services/base/base.apollo.service';
import { Observable } from 'rxjs/Observable';
import { Comment } from '../models';
import { getCompanyCommentsQuery, setCommentMutation, addCommentMutation, removeCommentMutation } from 'src/app/shared/api/comments.api';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectCommentFeatureComments } from 'src/app/store/states/comment.state';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  readonly comments$: Observable<Comment[]> = this.store.select(selectCommentFeatureComments);

  constructor(
    private readonly baseApolloService: BaseApolloService,
    private readonly store: Store<AppState>,
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

  public removeComment(companyId: string, commentId: string): Observable<boolean> {
    const source$ = this.baseApolloService.mutation<{companyId: string, commentId: string}, boolean>(
        removeCommentMutation,
        data => data.removeComment, {
            companyId,
            commentId,
        }
    );

    return source$;
  }
}
