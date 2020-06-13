import { selectCommentFeatureQuery } from './../states/comment.state';
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
  UpdateCompanyCommentError,
  ApplyOrderToCompanyComments,
  APPLY_ORDER_TO_COMPANY_COMMENTS
} from './../actions/comment.action';
import { CommentService } from 'src/app/shared/services/comment.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';

import {
  ADD_COMPANY_COMMENT,
  AddCompanyComment
} from 'src/app/store/actions/comment.action';
import { Loader } from 'src/app/shared/helpers/loader';
import { trackExecution } from 'src/app/shared/helpers/custom-operators';
import { AppState } from 'src/app/app.state';
import { QueryPayloadInput } from 'src/app/shared/models/query/query-payload.model';

@Injectable()
export class CommentEffects {


  constructor(
    private readonly actions: Actions,
    private readonly commentService: CommentService,
    private readonly store: Store<AppState>,
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
    catchError(() => of(new AddCompanyCommentError()))
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
    catchError(() => of(new UpdateCompanyCommentError()))
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
    catchError(() => of(new RemoveCompanyCommentError()))
  );

  @Effect()
  getAllCompanyComments$: Observable<Action> = this.actions.pipe(
    ofType(GET_ALL_COMPANY_COMMENTS),
    withLatestFrom(this.store.select(selectCommentFeatureQuery)),
    trackExecution(GET_ALL_COMPANY_COMMENTS, ([action, query]: [GetAllCompanyComments, QueryPayloadInput]) =>
        this.commentService.getCompanyComments(action.payload.companyId, query).pipe(
            map(comments => new GetAllCompanyCommentsSuccess({ comments }))
        )
    ),
    catchError((e) => { console.log(e); return of(new GetAllCompanyCommentsError())})
  );

  @Effect()
  applyOrderToCompanyComments$: Observable<Action> = this.actions.pipe(
    ofType(APPLY_ORDER_TO_COMPANY_COMMENTS),
    map((action: ApplyOrderToCompanyComments) => new GetAllCompanyComments({
        companyId: action.payload.companyId
    }))
  );
}


