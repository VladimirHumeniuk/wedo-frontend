import { Action } from '@ngrx/store';
import { Category } from './../../shared/models';

export const GET_ALL_CATEGORIES          = '[CATEGORIES] Get All Categories';
export const GET_ALL_CATEGORIES_SUCCESS  = '[CATEGORIES] Get All Categories Success';
export const GET_ALL_CATEGORIES_ERROR    = '[CATEGORIES] Get All Categories Error';

export const REMOVE_CATEGORY           = '[CATEGORIES] Remove';
export const REMOVE_CATEGORY_SUCCESS   = '[CATEGORIES] Remove Category Success';
export const REMOVE_CATEGORY_ERROR     = '[CATEGORIES] Remove Category Error';

export class GetAllCategories implements Action {
  readonly type = GET_ALL_CATEGORIES;

  constructor() {}
}

export class GetAllCategoriesSuccess implements Action {
  readonly type = GET_ALL_CATEGORIES_SUCCESS;

  constructor(public payload: { categories: Category[] }) {}
}

export class GetAllCategoriesError implements Action {
  readonly type = GET_ALL_CATEGORIES_ERROR;
  constructor() {}
}

export class RemoveCategory implements Action {
  readonly type = REMOVE_CATEGORY;

  constructor(public payload: { id: number; }) {}
}

export class RemoveCategorySuccess implements Action {
  readonly type = REMOVE_CATEGORY_SUCCESS;

  constructor(public payload: { id: number; }) {}
}

export class RemoveCategoryError implements Action {
  readonly type = REMOVE_CATEGORY_ERROR;
  constructor() {}
}

export type Actions = GetAllCategories
  | GetAllCategoriesSuccess
  | GetAllCategoriesError
  | RemoveCategory
  | RemoveCategorySuccess
  | RemoveCategoryError;
