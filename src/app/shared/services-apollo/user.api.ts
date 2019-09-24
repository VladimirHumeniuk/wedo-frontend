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

export const companyFieldFragment = gql`
    fragment companyFields on Company {
      cid,
      title,
      owner,
      created,
      image,
      url,
      phone {
        isValid
      },
      category,
      email,
      address,
      wysiwyg,
      shortDescription,
      isShown,
    }
`;

// Api;
export const getAllUsersQuery = gql`
    query {
        getAllUsers {
            ...userFields
        }
    }
    ${userFieldFragment}
`;

export const getUserQuery = gql`
    query getUser($uid: String!) {
        getUser(uid: $uid) {
            ...userFields
        }
    }
    ${userFieldFragment}
`;

export const getAllCompaniesQuery = gql`
    query {
        getAllCompanies {
            ...companyFields
        }
    }
    ${companyFieldFragment}
`;

export const getCompanyQuery = gql`
    query getCompany($cid: String!) {
        getCompany(cid: $cid) {
            ...companyFields
        }
    }
    ${companyFieldFragment}
`;

// Mutation

export const assignCompanyMutation = gql`
    mutation assignCompany($userId: String!, $companyId: String!) {
      assignCompany(userId: $userId, companyId: $companyId)
    }
`;



