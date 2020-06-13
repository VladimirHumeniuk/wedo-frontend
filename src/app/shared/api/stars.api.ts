import { starFieldsFragment } from 'src/app/shared/api/common/api.fragments';
import gql from 'graphql-tag';

// Api
export const getCompanyStarsQuery = gql`
    query getCompanyStars($cid: String!) {
        getCompanyStars(cid: $cid) {
            ...starFields
        }
    }
    ${starFieldsFragment}
`;

export const getUserStarsQuery = gql`
    query getUserStars($cid: String!) {
        getUserStars(cid: $cid) {
            ...starFields
        }
    }
    ${starFieldsFragment}
`;


// Mutation
export const setStarMutation = gql`
    mutation setStar($star: StarInput!) {
        setStar(star: $star)
    }
`;
