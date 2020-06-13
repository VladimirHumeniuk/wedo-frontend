import { Action } from '@ngrx/store';
import { Comment } from './../../shared/models';
import { QueryPayloadInput } from 'src/app/shared/models/query/query-payload.model';

export const ADD_COMPANY_COMMENT         = '[COMMENT] Add Company Comment';
export const ADD_COMPANY_COMMENT_SUCCESS = '[COMMENT] Add Company Comment Succes';
export const ADD_COMPANY_COMMENT_ERROR   = '[COMMENT] Add Company Comment Error';

export const UPDATE_COMPANY_COMMENT         = '[COMMENT] Update Company Comment';
export const UPDATE_COMPANY_COMMENT_SUCCESS = '[COMMENT] Update Company Comment Succes';
export const UPDATE_COMPANY_COMMENT_ERROR   = '[COMMENT] Update Company Comment Error';

export const REMOVE_COMPANY_COMMENT         = '[COMMENT] Remove Company Comment';
export const REMOVE_COMPANY_COMMENT_SUCCESS = '[COMMENT] Remove Company Comment Success';
export const REMOVE_COMPANY_COMMENT_ERROR   = '[COMMENT] Remove Company Comment Error';

export const GET_ALL_COMPANY_COMMENTS         = '[COMMENT] Get All Company Comments';
export const GET_ALL_COMPANY_COMMENTS_SUCCESS = '[COMMENT] Get All Company Comment Success';
export const GET_ALL_COMPANY_COMMENTS_ERROR   = '[COMMENT] Get All Company Comment Error';

export const APPLY_ORDER_TO_COMPANY_COMMENTS  = '[COMMENT] Apply Order To Company Comments';

export class AddCompanyComment implements Action {
  readonly type = ADD_COMPANY_COMMENT;
  constructor(public payload: { companyId: string; comment: Comment }) {}
}

export class AddCompanyCommentSuccess implements Action {
  readonly type = ADD_COMPANY_COMMENT_SUCCESS;

  constructor(public payload: { comment: Comment }) {}
}

export class AddCompanyCommentError implements Action {
  readonly type = ADD_COMPANY_COMMENT_ERROR;
  constructor() {}
}

export class UpdateCompanyComment implements Action {
  readonly type = UPDATE_COMPANY_COMMENT;
  constructor(public payload: { companyId: string; comment: Comment }) {}
}

export class UpdateCompanyCommentSuccess implements Action {
  readonly type = UPDATE_COMPANY_COMMENT_SUCCESS;

  constructor(public payload: { comment: Comment }) {}
}

export class UpdateCompanyCommentError implements Action {
  readonly type = UPDATE_COMPANY_COMMENT_ERROR;
  constructor() {}
}

export class RemoveCompanyComment implements Action {
  readonly type = REMOVE_COMPANY_COMMENT;

  constructor(public payload: { companyId: string; commentId: string }) {}
}

export class RemoveCompanyCommentSuccess implements Action {
  readonly type = REMOVE_COMPANY_COMMENT_SUCCESS;

  constructor(public payload: { commentId: string }) {}
}

export class RemoveCompanyCommentError implements Action {
  readonly type = REMOVE_COMPANY_COMMENT_ERROR;
  constructor() {}
}

export class GetAllCompanyComments implements Action {
  readonly type = GET_ALL_COMPANY_COMMENTS;

  constructor(public payload: { companyId: string }) {}
}
export class GetAllCompanyCommentsSuccess implements Action {
  readonly type = GET_ALL_COMPANY_COMMENTS_SUCCESS;

  constructor(public payload: { comments: Comment[] }) {}
}

export class GetAllCompanyCommentsError implements Action {
  readonly type = GET_ALL_COMPANY_COMMENTS_ERROR;
  constructor() {}

}
export class ApplyOrderToCompanyComments implements Action {
  readonly type = APPLY_ORDER_TO_COMPANY_COMMENTS;
  constructor(public payload: { companyId: string, query: QueryPayloadInput }) {}
}

export type Actions =
  | AddCompanyComment
  | AddCompanyCommentSuccess
  | AddCompanyCommentError
  | UpdateCompanyComment
  | UpdateCompanyCommentSuccess
  | UpdateCompanyCommentError
  | RemoveCompanyComment
  | RemoveCompanyCommentSuccess
  | RemoveCompanyCommentError
  | GetAllCompanyComments
  | GetAllCompanyCommentsSuccess
  | GetAllCompanyCommentsError
  | ApplyOrderToCompanyComments;
