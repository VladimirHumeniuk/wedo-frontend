import { commentFieldsFragment } from 'src/app/shared/api/common/api.fragments';
import gql from 'graphql-tag';

// Api
export const getCompanyCommentsQuery = gql`
    query getCompanyComments($cid: String!, $query: QueryPayloadInput) {
        getCompanyComments(cid: $cid, query: $query) {
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

export const removeCommentMutation = gql`
    mutation removeComment($companyId: String!, $commentId: String!) {
        removeComment(companyId: $companyId, commentId: $commentId)
    }
`;

