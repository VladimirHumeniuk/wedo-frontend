import gql from 'graphql-tag';
import { companyPreviewFieldsFragment } from './common/api.fragments';

// API
export const indexSearchQuery = gql`
    query indexSearch($collection: String!, $query: String, $filters: String, $page: Int) {
        indexSearch(
          collection: $collection,
          query: $query,
          filters: $filters,
          page: $page
        ) {
          ... on CompanyPreview {
            ...companyPreviewFields
          }
        }
    }
    ${companyPreviewFieldsFragment}
`;

