import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export function _localStorageSync(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [],
    rehydrate: true,
    removeOnUndefined: true
  })(reducer);
}