import gql from 'graphql-tag';
import { companyPreviewFieldsFragment } from './common/api.fragments';

// API
export const indexSearchQuery = gql`
    query indexSearch($collection: String!, $hitsPerPage: Int!, $query: String, $filters: String, $page: Int) {
        indexSearch(
          collection: $collection,
          hitsPerPage: $hitsPerPage,
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

