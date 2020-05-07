import { Action } from '@ngrx/store';
import { CompanyCard } from './../../shared/models';

export const GET_ALL_COMPANIES          = '[COMPANIES] Get All Companies';
export const GET_ALL_COMPANIES_SUCCESS  = '[COMPANIES] Get All Companies Success';
export const GET_ALL_COMPANIES_ERROR    = '[COMPANIES] Get All Companies Error';

export class GetAllCompanies implements Action {
  readonly type = GET_ALL_COMPANIES;

  constructor() {}
}
export class GetAllCompaniesSuccess implements Action {
  readonly type = GET_ALL_COMPANIES_SUCCESS;

  constructor(public payload: { companies: CompanyCard[] }) {}
}

export class GetAllCompaniesError implements Action {
  readonly type = GET_ALL_COMPANIES_ERROR;
  constructor() {}
}

export type Actions = GetAllCompanies
  | GetAllCompaniesSuccess
  | GetAllCompaniesError;
