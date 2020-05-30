import gql from 'graphql-tag';
import { companyPreviewFieldsFragment } from './common/api.fragments';

// API
export const indexSearchQuery = gql`
    query indexSearch(
      $collection: String!,
      $query: String!,
      $hitsPerPage: Int!,
      $page: Int,
      $filters: String
    ) {
        indexSearch(
          collection: $collection,
          query: $query,
          hitsPerPage: $hitsPerPage,
          page: $page,
          filters: $filters
        ) {
          total,
          hits {
            ... on CompanyPreview {
              ...companyPreviewFields
            }
          }
        }
    }
    ${companyPreviewFieldsFragment}
`;

