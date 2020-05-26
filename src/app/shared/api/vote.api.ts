import gql from 'graphql-tag';

// Api

// Mutation
export const setStarMutation = gql`
    mutation setVote($companyId: String!, $commentId: String!, $vote: VoteInput!) {
        setVote(companyId: $companyId, commentId: $commentId, vote: $vote)
    }
`;
