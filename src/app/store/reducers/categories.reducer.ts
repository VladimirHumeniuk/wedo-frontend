
import { CategoriesState } from 'src/app/store/states/categories.state';
import * as CategoriesActions from '../actions/categories.action';
import { Category } from 'src/app/shared/models';

export function categoriesReducer(
  state: CategoriesState = new CategoriesState(),
  action: CategoriesActions.Actions
) {
  switch (action.type) {

    case CategoriesActions.GET_ALL_CATEGORIES: {
      return { ...state, loading: true, error: null };
    }

    case CategoriesActions.GET_ALL_CATEGORIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        categories: [...action.payload.categories]
      };
    }

    case CategoriesActions.GET_ALL_CATEGORIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: 'All Categories are not fetched',
      }
    }

    case CategoriesActions.REMOVE_CATEGORY: {
      return { ...state, loading: true, error: null };
    }

    case CategoriesActions.REMOVE_CATEGORY_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        alerts: [...state.categories.filter(x => x.id !== action.payload.id)]
      };
    }

    case CategoriesActions.REMOVE_CATEGORY_ERROR: {
      return {
        ...state,
        loading: false,
        error: 'Category is not removed',
      }
    }

    default:
      return state;
  }
}
