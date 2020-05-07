import { createSelector } from '@ngrx/store';
import { User, CompanyCard } from 'src/app/shared/models';
import { AppState } from 'src/app/app.state';

export class AdminState {
    users: User[];
    companies: CompanyCard[];

    constructor() {
        this.users = [];
        this.companies = [];
    }
}

export const selectAdminFeature = (state: AppState) => state.admin;

export const selectAdminFeatureUsers = createSelector(selectAdminFeature, (state: AdminState) => state.users);
export const selectAdminFeatureCompanies = createSelector(selectAdminFeature, (state: AdminState) => state.companies);