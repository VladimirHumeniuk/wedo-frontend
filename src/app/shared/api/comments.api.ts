import { commentFieldsFragment } from 'src/app/shared/api/common/api.fragments';
import gql from 'graphql-tag';

// Api
export const getCompanyCommentsQuery = gql`
    query getCompanyComments($cid: String!) {
        getCompanyComments(cid: $cid) {
            ...commentFields
        }
    }
    ${commentFieldsFragment}
`;


// Mutation
export const setCommentMutation = gql`
    mutation setComment($companyId: String!, $comment: CommentInput!) {
        setComment(companyId: $companyId, comment: $comment)
    }
`;

export const addCommentMutation = gql`
    mutation addComment($companyId: String!, $comment: CommentInput!) {
        addComment(companyId: $companyId, comment: $comment)
    }
`;

