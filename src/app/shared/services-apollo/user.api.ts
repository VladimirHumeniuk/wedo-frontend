import gql from 'graphql-tag';

// Fragments;

export const userFieldFragment = gql`
    fragment userFields on User {
        uid,
        email,
        accountType,
        acceptTermsAndConditions
    }
`;

// Api;

export const getAllUsersQuery = gql`
    query {
        users {
            ...userFields
        }
    }
    ${userFieldFragment}
`;

