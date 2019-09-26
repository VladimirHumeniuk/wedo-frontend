import { companyFieldsFragment, userFieldsFragment } from 'src/app/shared/services-apollo/common/api.fragments';
import gql from 'graphql-tag';

export const getItemsQuery = gql`
    query getItems($type: String!, $search: String, $category: String) {
        getItems(type: $type, search: $search, category: $category) {
            ... on Company {
                cid,
                title,
                owner,
                created,
                image,
                url
              },
              ... on User {
                uid,
                email
              },
        }
    }
`;