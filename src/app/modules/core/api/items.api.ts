
import gql from 'graphql-tag';
import {
  companyFieldsFragment,
  userFieldsFragment
} from 'src/app/shared/api/common/api.fragments';

export const getItemsQuery = gql`
    query getItems($type: String!, $search: String, $category: String) {
        getItems(type: $type, search: $search, category: $category) {
            ... on Company {
                ...companyFields
              },
              ... on User {
                ...userFields
              },
        }
    }
    ${companyFieldsFragment}
    ${userFieldsFragment}
`;
