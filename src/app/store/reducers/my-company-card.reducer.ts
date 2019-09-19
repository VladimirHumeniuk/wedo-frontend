import { Action } from '@ngrx/store';
import { CompanyCard } from '../../shared/models';
import * as MyCompanyCardActions from '../actions/my-company-card.action';

export function myCompanyCardReducer(state: CompanyCard, action: MyCompanyCardActions.Actions) {
  switch(action.type) {
    case MyCompanyCardActions.SAVE_COMPANY:
      return { ...action.payload }

    case MyCompanyCardActions.GET_COMPANY:
      return { ...action.payload }

    default:
      return state
  }
}