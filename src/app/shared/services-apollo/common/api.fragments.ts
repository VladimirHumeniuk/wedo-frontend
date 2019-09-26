import gql from 'graphql-tag';

// Fragments;
export const userFieldsFragment = gql`
    fragment userFields on User {
        uid,
        email,
        accountType,
        acceptTermsAndConditions
    }
`;

export const companyFieldsFragment = gql`
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