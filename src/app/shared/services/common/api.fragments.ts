import gql from 'graphql-tag';

// Fragments;
export const userFieldsFragment = gql`
    fragment userFields on User {
        uid,
        email,
        accountType,
        acceptTermsAndConditions,
        emailVerified,
        company,
        createdAt,
        roles {
          admin,
          readonly,
          author
        }
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
      phone,
      category,
      email,
      address,
      wysiwyg,
      shortDescription,
      isShown,
    }
`;

export const alertFieldsFragment = gql`
    fragment alertFields on Alert {
      code,
      status,
      message,
      adviseUrl,
      closable
    }
`;

export const alertDataFieldsFragment = gql`
    fragment alertDataFields on AlertData {
      id,
      alerts {
        ...alertFields
      }
    }
    ${alertFieldsFragment}
`;