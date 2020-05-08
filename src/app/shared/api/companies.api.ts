import gql from 'graphql-tag';
import { companyFieldsFragment } from './common/api.fragments';

// Api;
export const getAllCompaniesQuery = gql`
    query {
        getAllCompanies {
            ...companyFields
        }
    }
    ${companyFieldsFragment}
`;

export const getCompanyQuery = gql`
    query getCompany($cid: String) {
        getCompany(cid: $cid) {
            ...companyFields
        }
    }
    ${companyFieldsFragment}
`;

// Mutation
export const assignCompanyMutation = gql`
    mutation assignCompany($userId: String!, $companyId: String!) {
      assignCompany(userId: $userId, companyId: $companyId)
    }
`;

export const removeCompanyMutation = gql`
    mutation removeCompany($cid: String!) {
        removeCompany(cid: $cid)
    }
`;