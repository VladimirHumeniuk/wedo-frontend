import { commentFieldsFragment } from 'src/app/shared/api/common/api.fragments';
import gql from 'graphql-tag';

// Api
export const getCompanyCommentsQuery = gql`
    query getCompanyComments($cid: String!) {
        getCompanyComments(cid: $cid) {
            ...commentsFields
        }
    }
    ${commentFieldsFragment}
`;


