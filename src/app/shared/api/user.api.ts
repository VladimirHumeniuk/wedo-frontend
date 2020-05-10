import gql from 'graphql-tag';
import { userFieldsFragment, companyFieldsFragment } from './common/api.fragments';

// Api;
export const getAllUsersQuery = gql`
    query getAllUsers($lastVisible: Int, $limit: Int) {
        getAllUsers(lastVisible: $lastVisible, limit: $limit) {
            ...userFields
        }
    }
    ${userFieldsFragment}
`;

export const getUserQuery = gql`
    query getUser($uid: String!) {
        getUser(uid: $uid) {
            ...userFields
        }
    }
    ${userFieldsFragment}
`;
