import { Action } from '@ngrx/store';

export const RECALCULATE_COMPANY_RATING = '[RATING] Recalculate Company Rating';
export const RECALCULATE_COMPANY_RATING_SUCCESS = '[RATING] Recalculate Company Rating Succes';
export const RECALCULATE_COMPANY_RATING_ERROR = '[RATING] Recalculate Company Rating Error';

export class RecalculateCompanyRating implements Action {
    readonly type = RECALCULATE_COMPANY_RATING;

    constructor(public payload: { companyId: string }) {}
  }

  export class RecalculateCompanyRatingSuccess implements Action {
    readonly type = RECALCULATE_COMPANY_RATING_SUCCESS;

    constructor() {}
  }

  export class RecalculateCompanyRatingError implements Action {
    readonly type = RECALCULATE_COMPANY_RATING_ERROR;
    constructor() {}
  }