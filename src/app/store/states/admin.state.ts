import { User } from 'src/app/shared/models';
import {AppState} from 'src/app/app.state';
import {createSelector} from '@ngrx/store';

export class AdminState {
    users: User[];

    constructor() {
        this.users = [];
    }
}

export const selectAdminFeature = (state: AppState) => state.admin;
export const selectAdminFeatureUsers = createSelector(selectAdminFeature, (state: AdminState) => state.users);