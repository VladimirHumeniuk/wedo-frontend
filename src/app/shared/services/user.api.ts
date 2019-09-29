import gql from 'graphql-tag';
import { userFieldsFragment, companyFieldsFragment } from './common/api.fragments';

// Api;
export const getAllUsersQuery = gql`
    query {
        getAllUsers {
            ...userFields
        }
    }
    ${userFieldsFragment}
`;

export const getUserQuery = gql`
    query getUser($uid: String!) {
        getUser(uid: $uid) {
            ...userFields
        }
    }
    ${userFieldsFragment}
`;

export const getAllCompaniesQuery = gql`
    query {
        getAllCompanies {
            ...companyFields
        }
    }
    ${companyFieldsFragment}
`;

export const getCompanyQuery = gql`
    query getCompany($cid: String!) {
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



