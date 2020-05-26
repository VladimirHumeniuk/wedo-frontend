import {
  AddCompanyCommentSuccess,
  GET_ALL_COMPANY_COMMENTS,
  GetAllCompanyComments,
  GetAllCompanyCommentsSuccess,
  GetAllCompanyCommentsError,
  REMOVE_COMPANY_COMMENT,
  RemoveCompanyComment,
  AddCompanyCommentError,
  RemoveCompanyCommentSuccess,
  RemoveCompanyCommentError,
  UPDATE_COMPANY_COMMENT,
  UpdateCompanyComment,
  UpdateCompanyCommentSuccess,
  UpdateCompanyCommentError
} from './../actions/comment.action';
import { CommentService } from 'src/app/shared/services/comment.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of, pipe, UnaryFunction } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, catchError, switchMap, tap, delay } from 'rxjs/operators';

import {
  ADD_COMPANY_COMMENT,
  AddCompanyComment
} from 'src/app/store/actions/comment.action';
import { Loader } from 'src/app/shared/helpers/loader';
import { trackExecution } from 'src/app/shared/helpers/custom-operators';

@Injectable()
export class CommentEffects {

    private readonly loader: Loader = Loader.instance;

  constructor(
    private readonly actions: Actions,
    private readonly commentService: CommentService
  ) {}

  @Effect()
  addCompanyComment$: Observable<Action> = this.actions.pipe(
    ofType(ADD_COMPANY_COMMENT),
    trackExecution(ADD_COMPANY_COMMENT, (action: AddCompanyComment) =>
      this.commentService
        .addComment(action.payload.companyId, action.payload.comment)
        .pipe(
          map(_ => ({
            comment: action.payload.comment,
            companyId: action.payload.companyId
          })),
          switchMap(({ comment, companyId }) => [
            new AddCompanyCommentSuccess({ comment }),
            new GetAllCompanyComments({ companyId })
          ]),
        )
    ),
    catchError(x => of(new AddCompanyCommentError()))
  );

  @Effect()
  updateCompanyComment$: Observable<Action> = this.actions.pipe(
    ofType(UPDATE_COMPANY_COMMENT),
    trackExecution(UPDATE_COMPANY_COMMENT, (action: UpdateCompanyComment) =>
      this.commentService
        .setComment(action.payload.companyId, action.payload.comment)
        .pipe(
          map(_ => ({
            comment: action.payload.comment,
            companyId: action.payload.companyId
          })),
          switchMap(({ comment, companyId }) => [
            new UpdateCompanyCommentSuccess({ comment }),
            new GetAllCompanyComments({ companyId })
          ]),
        )
    ),
    catchError(x => of(new UpdateCompanyCommentError()))
  );

  @Effect()
  removeCompanyComment$: Observable<Action> = this.actions.pipe(
    ofType(REMOVE_COMPANY_COMMENT),
    trackExecution(REMOVE_COMPANY_COMMENT, (action: RemoveCompanyComment) =>
      this.commentService
        .removeComment(action.payload.companyId, action.payload.commentId)
        .pipe(
          map(_ => ({
            companyId: action.payload.companyId,
            commentId: action.payload.commentId
          }))
        )
    ),
    switchMap(({ companyId, commentId }) => [
      new RemoveCompanyCommentSuccess({ commentId }),
      new GetAllCompanyComments({ companyId })
    ]),
    catchError(x => of(new RemoveCompanyCommentError()))
  );

  @Effect()
  getAllCompanyComments$: Observable<Action> = this.actions.pipe(
    ofType(GET_ALL_COMPANY_COMMENTS),
    trackExecution(GET_ALL_COMPANY_COMMENTS, (action: GetAllCompanyComments) => this.commentService
        .getCompanyComments(action.payload.companyId).pipe(
            map(comments => new GetAllCompanyCommentsSuccess({ comments })),
        )
    ),
    catchError(x => of(new GetAllCompanyCommentsError()))
  );
}


