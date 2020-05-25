import gql from 'graphql-tag';

// Fragments;
export const userFieldsFragment = gql`
    fragment userFields on User {
        uid,
        username,
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

export const categoryFieldsFragment = gql`
    fragment categoryFields on Category {
      id,
      title
    }
`;

export const companyFieldsFragment = gql`
    fragment companyFields on Company {
      cid,
      title,
      owner,
      comments {
        id,
        date,
        text,
        author {
          uid,
          username
        },
        isEdited,
        rating
      },
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
      rating,
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

// Comment
export const commentFieldsFragment = gql`
  fragment commentFields on Comment {
    id,
    date,
    text,
    isEdited,
    rating,
    answer {
      date,
      text,
      isEdited
    },
    votes {
      value
    },
    author {
      uid,
      username
    }
  }
`;

// Star
export const starFieldsFragment = gql`
  fragment starFields on Star {
    cid,
    uid,
    value
  }
`;