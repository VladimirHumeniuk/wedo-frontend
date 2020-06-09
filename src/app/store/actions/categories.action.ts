import { Action } from '@ngrx/store';
import { Category, Popular } from './../../shared/models';

export const GET_ALL_CATEGORIES          = '[CATEGORIES] Get All Categories';
export const GET_ALL_CATEGORIES_SUCCESS  = '[CATEGORIES] Get All Categories Success';
export const GET_ALL_CATEGORIES_ERROR    = '[CATEGORIES] Get All Categories Error';

export const GET_POPULAR         = '[CATEGORIES] Get Most Popular Categories';
export const GET_POPULAR_SUCCESS = '[CATEGORIES] Get Most Popular Categories Success';
export const GET_POPULAR_ERROR   = '[CATEGORIES] Get Most Popular Categories Error';

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

export class GetPopularCategories implements Action {
  readonly type = GET_POPULAR;
  constructor() {}
}

export class GetPopularCategoriesSuccess implements Action {
  readonly type = GET_POPULAR_SUCCESS;
  constructor(public payload: { popular: Popular[] }) {}
}

export class GetPopularCategoriesError implements Action {
  readonly type = GET_POPULAR_ERROR;
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
  | GetPopularCategories
  | GetPopularCategoriesSuccess
  | GetPopularCategoriesError
  | RemoveCategory
  | RemoveCategorySuccess
  | RemoveCategoryError;
