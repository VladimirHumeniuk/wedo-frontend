import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { CompanyCard } from '../../shared/models';

export const GET_COMPANY   = '[MY COMPANY] Get Company'
export const SAVE_COMPANY  = '[MY COMPANY] Save'

export class GetCompany implements Action {
  readonly type = GET_COMPANY
  constructor (public payload?: CompanyCard) {}
}

export class SaveCompany implements Action {
  readonly type = SAVE_COMPANY
  constructor (public payload: CompanyCard) {}
}

export type Actions = GetCompany | SaveCompany